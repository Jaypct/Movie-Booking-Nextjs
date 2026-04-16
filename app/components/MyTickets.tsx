"use client";
import React from "react";
import { formatDate } from "../lib/utils";

interface Booking {
  id: string;
  movie_title: string;
  seat: string;
  created_at: string;
}

interface MyTicketsProps {
  bookings: Booking[];
}

const MyTickets = ({ bookings }: MyTicketsProps) => {
  return (
    <div>
      <h2>My Tickets</h2>
      {bookings.map((booking) => (
        <div key={booking.id} className="border p-4 mb-2">
          <p>Movie: {booking.movie_title}</p>
          <p>Seat: {booking.seat}</p>
          <p>Date: {formatDate(booking.created_at)}</p>
        </div>
      ))}
    </div>
  );
};

export default MyTickets;
