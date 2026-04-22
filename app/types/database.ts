export type ProfileRoles = "user" | "admin";
export type BookingStatus = "active" | "used" | "expired";

export interface Booking {
  id: string;
  movie_id: string;
  movie_title: string;
  user_id: string;
  email: string;
  seat: string;
  created_at: string;
  schedules?: {
    show_date?: string;
    show_time?: string;
  } | null;
  qr_token: string;
  status: BookingStatus;
}

export interface BookingInsert {
  movie_id: number;
  movie_title: string;
  email: string;
  seat: string;
  date: Date;
  time: string;
}

export interface profiles {
  name?: string;
  email: string;
  role: ProfileRoles;
}
