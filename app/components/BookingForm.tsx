"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  Armchair,
  CheckCircle2,
  CircleAlert,
  Mail,
  Ticket,
} from "lucide-react";
import { createBooking } from "../actions/booking";

const rows = ["A", "B", "C", "D", "E", "F"];
const cols = [1, 2, 3, 4, 5, 6];
const pricePerSeat = 280;

interface BookingFormProps {
  movieId: string | null;
  movieTitle: string | null;
}

const BookingForm = ({ movieId, movieTitle }: BookingFormProps) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [didSucceed, setDidSucceed] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const totalPrice = selectedSeats.length * pricePerSeat;

  const toggleSeat = (seatId: string) => {
    setDidSucceed(false);
    setMessage("");
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
    setDidSucceed(false);

    if (selectedSeats.length === 0) {
      setMessage("Please select at least one seat.");
      setLoading(false);
      return;
    }

    const result = await createBooking(formData);
    if (result.error) {
      setMessage(result.error);
    } else {
      const seatsBooked = result.data?.seatsBooked ?? selectedSeats.length;
      setMessage(
        `${seatsBooked} seat${seatsBooked > 1 ? "s" : ""} booked successfully.`,
      );
      setDidSucceed(true);
      setSelectedSeats([]);
    }

    setLoading(false);
  }

  return (
    <div className="section-shell rounded-[2rem] p-5 sm:p-6 lg:p-7">
      <form action={handleSubmit} className="space-y-6">
        <input type="hidden" name="movie_id" value={movieId ?? ""} />
        <input type="hidden" name="movie_title" value={movieTitle ?? ""} />
        <input type="hidden" name="seat" value={selectedSeats.join(",")} />

        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">
            Checkout details
          </p>
          <h2 className="mt-2 text-2xl font-semibold">Confirm your booking</h2>
          <p className="mt-3 text-sm leading-6 text-white/65">
            Everything here is designed to stay simple: add your email, choose
            seats, and confirm when it feels right.
          </p>
        </div>

        <div className="space-y-3">
          <label
            htmlFor="booking-email"
            className="text-sm font-medium text-white"
          >
            Booking email
          </label>
          <div className="input-shell flex items-center gap-3 rounded-[1.25rem] px-4 py-3">
            <Mail className="h-4 w-4 text-white/45" />
            <input
              id="booking-email"
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
            />
          </div>
        </div>

        <div className="rounded-[1.6rem] border border-white/8 bg-white/5 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                Movie
              </p>
              <p className="mt-2 text-lg font-semibold">
                {movieTitle || "Select a movie first"}
              </p>
            </div>
            <div className="flex gap-2 text-xs text-white/55">
              <span className="chip">1 seat = PHP {pricePerSeat}</span>
              <span className="chip">36 seats shown</span>
            </div>
          </div>

          <div className="mt-5 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-center text-xs uppercase tracking-[0.35em] text-white/45">
            Screen this way
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-white/55 sm:grid-cols-6">
            <span className="chip justify-center border-white/10">
              Available
            </span>
            <span className="chip justify-center border-emerald-400/20 bg-emerald-400/15 text-emerald-200">
              Selected
            </span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {rows.map((row) =>
              cols.map((col) => {
                const seatId = `${row}${col}`;
                const isSelected = selectedSeats.includes(seatId);

                return (
                  <button
                    type="button"
                    key={seatId}
                    onClick={() => toggleSeat(seatId)}
                    className={`flex min-h-16 flex-col items-center justify-center rounded-[1rem] border text-xs font-semibold transition cursor-pointer
                  ${
                    isSelected
                      ? "border-emerald-400/20 bg-emerald-400/15 text-emerald-200"
                      : "border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10"
                  }
                `}
                  >
                    <Armchair className="h-4 w-4" />
                    <span className="mt-1">{seatId}</span>
                  </button>
                );
              }),
            )}
          </div>
        </div>

        <div className="text-black">
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <select name="time">
            <option value="07:00">7:00 AM</option>
            <option value="09:00">9:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="13:00">1:00 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="17:00">5:00 PM</option>
            <option value="19:00">7:00 PM</option>
            <option value="21:00">9:00 PM</option>
          </select>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="rounded-[1.6rem] border border-white/8 bg-white/5 p-4 sm:p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-white/45">
              Ticket summary
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedSeats.length ? (
                selectedSeats.map((seat) => (
                  <span
                    key={seat}
                    className="rounded-full border border-emerald-400/20 bg-emerald-400/15 px-3 py-1.5 text-sm font-medium text-emerald-200"
                  >
                    {seat}
                  </span>
                ))
              ) : (
                <p className="text-sm text-white/55">No seats selected yet.</p>
              )}
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-4">
              <div>
                <p className="text-sm text-white/55">Estimated total</p>
                <p className="text-2xl font-semibold">
                  PHP {totalPrice.toLocaleString()}
                </p>
              </div>
              <p className="text-sm text-white/55">
                {selectedSeats.length} seat
                {selectedSeats.length === 1 ? "" : "s"} selected
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !movieId || !movieTitle}
            className="button-primary w-full px-6 py-4 text-sm disabled:cursor-not-allowed disabled:opacity-50 lg:w-auto"
          >
            <Ticket className="h-4 w-4" />
            {loading ? "Booking seats..." : "Confirm booking"}
          </button>
        </div>

        {message ? (
          <div
            className={`rounded-[1.4rem] border p-4 text-sm ${
              didSucceed
                ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
                : "border-amber-400/20 bg-amber-400/10 text-amber-100"
            }`}
          >
            <div className="flex items-start gap-3">
              {didSucceed ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              ) : (
                <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" />
              )}
              <div>
                <p>{message}</p>
                {didSucceed ? (
                  <Link
                    href="/booked-tickets"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white underline underline-offset-4"
                  >
                    View my tickets
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default BookingForm;
