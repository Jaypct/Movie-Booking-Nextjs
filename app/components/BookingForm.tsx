"use client";

import React, { useState } from "react";
import { createBooking } from "../actions/booking";
import { Armchair } from "lucide-react";

const rows = ["A", "B", "C", "D", "E", "F"];
const cols = [1, 2, 3, 4, 5, 6];

interface BookingFormProps {
  movieId: any;
  movieTitle: any;
}

const BookingForm = ({ movieId, movieTitle }: BookingFormProps) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const toggleSeat = (seatId: string) => {
    setSelectedSeats(
      (prev) =>
        prev.includes(seatId)
          ? prev.filter((seat) => seat !== seatId) // remove
          : [...prev, seatId], // add
    );
  };

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage("");

    if (selectedSeats.length === 0) {
      setMessage("Please select at least one seat.");
      setLoading(false);
      return;
    }

    const result = await createBooking(formData);
    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage("Booking Successful!");
      setSelectedSeats([]);
    }

    setLoading(false);
  }

  return (
    <div className="mt-20">
      <form action={handleSubmit}>
        <input type="hidden" name="movie_id" value={movieId} />
        <input type="hidden" name="movie_title" value={movieTitle} />
        <input type="hidden" name="seat" value={selectedSeats.join(",")} />
        <p>Enter your email</p>
        <input type="email" name="email" required />

        {/* display movie info */}
        <div>
          <p>
            <strong>Movie: </strong>
            {movieTitle}
          </p>
        </div>

        {/* Seat selection */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold">Select Your Seats</h2>

          <div className="grid grid-cols-6 gap-3">
            {rows.map((row) =>
              cols.map((col) => {
                const seatId = `${row}${col}`;
                const isSelected = selectedSeats.includes(seatId);

                return (
                  <button
                    type="button"
                    key={seatId}
                    onClick={() => toggleSeat(seatId)}
                    className={`w-12 h-12 rounded-lg font-semibold transition cursor-pointer text-black
                  ${
                    isSelected
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }
                `}
                  >
                    <Armchair />
                    {seatId}
                  </button>
                );
              }),
            )}
          </div>

          <div>
            <p className="text-sm">
              Selected Seats: {selectedSeats.join(", ") || "None"}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
          {message && <p>{message}</p>}
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
