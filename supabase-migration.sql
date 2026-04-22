-- PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
    id uuid references auth.users(id) on delete cascade,
    name text NOT NULL,
    email text NOT NULL,
    role TEXT NOT NULL DEFAULT 'user'
        CHECK (role IN ('user', 'admin')),
    PRIMARY KEY (id)
);

-- =========================
-- AUTO CREATE PROFILE ON SIGNUP
-- =========================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data ->> 'name',
      NEW.email
    ),
    NEW.email,
    'user'
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE PROCEDURE public.handle_new_user();


-- BOOKINGS TABLE 
CREATE TABLE IF NOT EXISTS bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    movie_id INTEGER NOT NULL,
    movie_title TEXT NOT NULL DEFAULT '',
    user_id UUID REFERENCES auth.users(id) on delete cascade,
    email TEXT NOT NULL
        CHECK (
          email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
        ),
    seat TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    schedule_id UUID REFERENCES schedules(id) ON DELETE CASCADE;
    qr_token text unique,
    status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'used', "expired")),
    unique(schedule_id, seat)
);

CREATE TABLE schedules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  movie_id INTEGER NOT NULL,
  show_date DATE NOT NULL,
  show_time TIME NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE bookings
ADD COLUMN schedule_id UUID REFERENCES schedules(id) ON DELETE CASCADE;

-- create index for faster queries
create index if not exists idx_bookings_movie_id on bookings(movie_id);
create index if not exists idx_bookings_created_at on bookings(created_at);
create index if not exists idx_bookings_user_id on bookings(user_id);

-- enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- POLICY: USER CAN ONLY VIEW THEIR OWN BOOK
CREATE POLICY "Users can view their own bookings"
    ON bookings
    FOR SELECT
    using (auth.uid() = user_id);
  
-- POLICY: USER CAN CREATE BOOKING
CREATE POLICY "Users can create bookings"
    ON bookings
    FOR INSERT
    WITH CHECK(auth.uid() = user_id);

create policy "Users can view own profile"
on profiles
for select
using (auth.uid() = id);

-- POLICY: ADMIN CAN VIEW ALL BOOKINGS
CREATE POLICY "Admins can view all bookings"
ON bookings
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
  )
);

-- POLICY: ADMIN CAN  delete all bookings
CREATE POLICY "Admins can delete all bookings"
ON bookings
FOR DELETE
USING (
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
  )
);