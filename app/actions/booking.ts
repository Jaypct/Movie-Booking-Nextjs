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

export const getBooking = async (id: string) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized", data: null };

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

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

  const bookingData: BookingInsert = {
    movie_id: parseInt(formData.get("movie_id") as string),
    movie_title: formData.get("movie_title") as string,
    email: formData.get("email") as string,
    seat: formData.get("seat") as string,
  };

  //Validation
  if (
    !bookingData.movie_id ||
    !bookingData.movie_title ||
    !bookingData.email ||
    !bookingData.seat
  ) {
    return { error: "All fields are required" };
  }

  const { error } = await supabase.from("bookings").insert({
    ...bookingData,
    user_id: user.id,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  return {
    data: null,
    error: {
      message: "duplicate key value violates unique constraint",
    },
  };
};
