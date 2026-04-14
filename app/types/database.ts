export type ProfileRoles = "user" | "admin";

export interface Booking {
  id: string;
  movie_id: string;
  movie_title: string;
  user_id: string;
  email: string;
  seat: string;
  created_at: string;
}

export interface BookingInsert {
  movie_id: number;
  movie_title: string;
  email: string;
  seat: string;
}

export interface profiles {
  name?: string;
  email: string;
  role: ProfileRoles;
}
