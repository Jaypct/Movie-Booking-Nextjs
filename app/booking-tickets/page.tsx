"use client";

import React from "react";
import BookingForm from "../components/BookingForm";
import { useSearchParams } from "next/navigation";

const Booking = () => {
  const searchParams = useSearchParams();
  const movie_id = searchParams.get("movie_id");
  const movie_title = searchParams.get("movie_title");

  return (
    <div>
      <h1>Book your Tickets Here</h1>
      <BookingForm movieId={movie_id} movieTitle={movie_title} />
    </div>
  );
};

export default Booking;
