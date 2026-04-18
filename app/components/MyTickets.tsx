"use client";
import { CalendarDays, Film, Mail, Ticket, WalletCards } from "lucide-react";
import Link from "next/link";
import { Booking } from "../types/database";
import { formatDateTime } from "../lib/utils";

interface MyTicketsProps {
  bookings: Booking[];
}

const MyTickets = ({ bookings }: MyTicketsProps) => {
  const groupedBookings = bookings.reduce<
    Array<{
      id: string;
      movieId: string;
      movieTitle: string;
      email: string;
      createdAt: string;
      seats: string[];
    }>
  >((groups, booking) => {
    const existingGroup = groups.find(
      (group) =>
        group.movieId === String(booking.movie_id) &&
        group.movieTitle === booking.movie_title &&
        group.email === booking.email &&
        group.createdAt === booking.created_at,
    );

    if (existingGroup) {
      existingGroup.seats.push(booking.seat);
      return groups;
    }

    groups.push({
      id: booking.id,
      movieId: String(booking.movie_id),
      movieTitle: booking.movie_title,
      email: booking.email,
      createdAt: booking.created_at,
      seats: [booking.seat],
    });

    return groups;
  }, []);

  if (!groupedBookings.length) {
    return (
      <div className="section-shell rounded-[2rem] p-8 sm:p-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/8 text-[var(--color-secondary)]">
            <WalletCards className="h-7 w-7" />
          </span>
          <h2 className="mt-5 text-2xl font-semibold">No tickets booked yet</h2>
          <p className="mt-4 text-sm leading-6 text-white/65 sm:text-base">
            Once you confirm a booking, your seats will appear here with the
            movie title and booking time so nothing feels hard to track.
          </p>
          <Link href="/" className="button-primary mt-6 px-6 py-3 text-sm">
            <Ticket className="h-4 w-4" />
            Start booking
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {groupedBookings.map((booking) => (
        <article
          key={booking.id}
          className="section-shell overflow-hidden rounded-[2rem]"
        >
          <div className="bg-[linear-gradient(135deg,rgba(255,107,87,0.18),rgba(255,195,113,0.08),transparent)] p-6 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                  Confirmed booking
                </p>
                <h2 className="mt-3 text-2xl font-semibold">
                  {booking.movieTitle}
                </h2>
              </div>
              <span className="chip text-sm">Active ticket</span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/8 bg-white/5 p-4">
                <p className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/45">
                  <Ticket className="h-4 w-4 text-[var(--color-secondary)]" />
                  Seats
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {booking.seats.map((seat) => (
                    <span
                      key={seat}
                      className="rounded-full border border-emerald-400/20 bg-emerald-400/15 px-3 py-1.5 text-sm font-medium text-emerald-200"
                    >
                      {seat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white/8 bg-white/5 p-4">
                <p className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/45">
                  <CalendarDays className="h-4 w-4 text-[var(--color-secondary)]" />
                  Booked on
                </p>
                <p className="mt-3 text-sm font-medium text-white">
                  {formatDateTime(booking.createdAt)}
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/8 bg-white/5 p-4">
                <p className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/45">
                  <Mail className="h-4 w-4 text-[var(--color-secondary)]" />
                  Email
                </p>
                <p className="mt-3 text-sm font-medium text-white">
                  {booking.email}
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-white/8 bg-white/5 p-4">
                <p className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/45">
                  <Film className="h-4 w-4 text-[var(--color-secondary)]" />
                  Route
                </p>
                <Link
                  href={`/movie/${booking.movieId}`}
                  className="mt-3 inline-flex text-sm font-medium text-white underline underline-offset-4"
                >
                  View movie page
                </Link>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default MyTickets;
