"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../lib/supabase/server";
import { BookingInsert } from "../types/database";

export const getBookings = async () => {
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

export const getBooking = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Unauthorized", data: null };

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("user_id", user.id);

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

  const movie_id = parseInt(formData.get("movie_id") as string);
  const movie_title = formData.get("movie_title") as string;
  const email = formData.get("email") as string;
  const seatString = formData.get("seat") as string;

  //Validation
  if (!movie_id || !movie_title || !email) {
    return { error: "All fields are required", data: null };
  } else if (!seatString) {
    return { error: "Please select at least one seat." };
  }

  const seats = seatString.split(",");

  const bookings = seats.map((seat) => ({
    movie_id,
    movie_title,
    email,
    seat: seat.trim(),
    user_id: user.id,
  }));

  const { error } = await supabase.from("bookings").insert(bookings);

  if (error) {
    // Detect duplicate seat booking
    if (error.message.includes("duplicate key")) {
      return {
        error: "This seat is already booked",
      };
    }
    return { error: error.message };
  }

  revalidatePath("/");
  return { error: null };
};
