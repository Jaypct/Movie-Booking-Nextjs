import { Ticket } from "lucide-react";
import Link from "next/link";
import { getBooking } from "../actions/booking";
import MyTickets from "../components/MyTickets";

export default async function BookedTicketsPage() {
  const { data, error } = await getBooking();

  if (error) {
    return (
      <main className="min-h-screen bg-black pt-24 text-white">
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="section-shell rounded-[2rem] p-8 sm:p-10">
            <h1 className="text-3xl font-semibold">My tickets</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/65">
              {error === "Unauthorized"
                ? "Sign in first so we can show the tickets connected to your account."
                : error}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/login" className="button-primary px-6 py-3 text-sm">
                <Ticket className="h-4 w-4" />
                Sign in
              </Link>
              <Link href="/" className="button-secondary px-6 py-3 text-sm">
                Browse movies
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black pt-24 text-white">
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.32em] text-[var(--color-secondary)]">
              My tickets
            </p>
            <h1 className="mt-2 text-4xl font-semibold">
              Keep every booking in one friendly place
            </h1>
          </div>
          <Link href="/" className="button-secondary px-5 py-3 text-sm">
            Browse more movies
          </Link>
        </div>

      <MyTickets bookings={data || []} />
      </section>
    </main>
  );
}
