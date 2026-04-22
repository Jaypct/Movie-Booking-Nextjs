"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../lib/supabase/server";
import { generateQRToken } from "../lib/utils";

export const getAllBookings = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized", data: null };

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return { error: error.message, data: null };

  return { error: null, data };
};

export const getUserBookings = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Unauthorized", data: null };

  const { data, error } = await supabase
    .from("bookings")
    .select(
      `*, schedules (
        show_date,
        show_time
      )`,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return { error: error.message, data: null };
  }

  return { error: null, data };
};

export const createBooking = async (formData: FormData) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Unauthorized", data: null };

  const qr_token = generateQRToken();

  const movie_id = parseInt(formData.get("movie_id") as string);
  const movie_title = formData.get("movie_title") as string;
  const email = formData.get("email") as string;
  const seatString = formData.get("seat") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;

  // Validation
  if (!movie_id || !movie_title || !email) {
    return { error: "All fields are required", data: null };
  }

  if (!seatString) {
    return { error: "Please select at least one seat." };
  }

  const seats = seatString.split(",");

  // ✅ Step 1: Upsert schedule (single source of truth)
  const { data: schedule, error: scheduleError } = await supabase
    .from("schedules")
    .upsert(
      {
        movie_id,
        show_date: date,
        show_time: time,
      },
      { onConflict: "movie_id,show_date,show_time" },
    )
    .select("id")
    .single();

  if (scheduleError) {
    return { error: "That Seat is taken!" };
  }

  const scheduleId = schedule.id;

  // ✅ Step 2: Prepare bookings
  const bookings = seats.map((seat) => ({
    movie_id,
    movie_title,
    email,
    seat: seat.trim(),
    user_id: user.id,
    schedule_id: scheduleId,
    qr_token,
  }));

  // ✅ Step 3: Insert bookings
  const { error: bookingError } = await supabase
    .from("bookings")
    .insert(bookings);

  if (bookingError) {
    if (bookingError.message.includes("duplicate key")) {
      return { error: "One or more seats are already booked" };
    }

    return { error: bookingError.message };
  }

  revalidatePath("/");
  revalidatePath("/booked-tickets");
  revalidatePath("/booking-tickets");

  return { error: null, data: { seatsBooked: seats.length } };
};

export const getUserBooking = async (booking_id: string) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Unauthorized", data: null };

  const { data, error } = await supabase
    .from("bookings")
    .select(
      `*, schedules (
        show_date,
        show_time
      )`,
    )
    .eq("id", booking_id)
    .eq("user_id", user.id) // 🔒 security check
    .single();

  if (error) {
    return { error: error.message, data: null };
  }

  return { error: null, data };
};
