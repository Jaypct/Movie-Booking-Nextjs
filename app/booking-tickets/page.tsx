import BookingForm from "../components/BookingForm";
import { CalendarDays, ChevronLeft, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getMovieDetails } from "../lib/tmdb";
import { formatLongDate, getImageUrl } from "../lib/utils";

export default async function BookingPage(props: PageProps<"/booking-tickets">) {
  const searchParams = await props.searchParams;
  const movieId =
    typeof searchParams.movie_id === "string" ? searchParams.movie_id : null;
  const movieTitle =
    typeof searchParams.movie_title === "string"
      ? searchParams.movie_title
      : null;
  const movie = movieId ? await getMovieDetails(movieId) : null;

  return (
    <main className="min-h-screen bg-black pt-24 text-white">
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={movieId ? `/movie/${movieId}` : "/"}
            className="button-secondary px-5 py-3 text-sm"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to movie
          </Link>
          <Link
            href="/booked-tickets"
            className="button-secondary px-5 py-3 text-sm"
          >
            <Ticket className="h-4 w-4" />
            View my tickets
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <div className="section-shell relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
              {movie ? (
                <>
                  <div className="absolute inset-0 opacity-25">
                    <Image
                      src={getImageUrl(movie.backdrop_path)}
                      alt={`${movie.title} backdrop`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/90 to-slate-950/65" />
                </>
              ) : null}

              <div className="relative">
                <span className="chip text-sm">Booking tickets</span>
                <h1 className="mt-5 text-3xl font-semibold sm:text-4xl">
                  {movieTitle || "Choose your seats"}
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-white/68 sm:text-base">
                  Pick your favorite seats, confirm your booking email, and we
                  will keep everything easy to review on your tickets page.
                </p>

                {movie ? (
                  <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/75">
                    <span className="chip">
                      <CalendarDays className="h-4 w-4 text-[var(--color-secondary)]" />
                      {formatLongDate(movie.release_date)}
                    </span>
                    <span className="chip">
                      Rated {movie.vote_average.toFixed(1)} / 10
                    </span>
                  </div>
                ) : null}
              </div>
            </div>

            {movie ? (
              <div className="section-shell flex gap-4 rounded-[2rem] p-4 sm:p-5">
                <div className="relative hidden aspect-[0.7] w-28 overflow-hidden rounded-[1.5rem] sm:block">
                  <Image
                    src={getImageUrl(movie.poster_path)}
                    alt={movie.title}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                    Your selection
                  </p>
                  <h2 className="mt-2 text-xl font-semibold">{movie.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-white/65">
                    Friendly tip: if you are booking for a group, choose all
                    seats in one go so your ticket summary stays tidy.
                  </p>
                </div>
              </div>
            ) : (
              <div className="section-shell rounded-[2rem] p-6">
                <h2 className="text-xl font-semibold">No movie selected yet</h2>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  Go back to the movie page and start booking from a title card
                  so we can prepare the details for you.
                </p>
              </div>
            )}
          </div>

          <BookingForm movieId={movieId} movieTitle={movieTitle} />
        </div>
      </section>
    </main>
  );
}
