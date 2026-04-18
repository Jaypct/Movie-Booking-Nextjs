import {
  CalendarDays,
  ChevronRight,
  PlayCircle,
  Star,
  Ticket,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getMovieDetails } from "@/app/lib/tmdb";
import {
  formatLongDate,
  formatYearDate,
  getImageUrl,
  truncate,
} from "@/app/lib/utils";

export default async function MoviePage(props: PageProps<"/movie/[id]">) {
  const { id } = await props.params;
  const movie = await getMovieDetails(id);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black pt-24 text-white">
      <div className="absolute inset-0">
        <Image
          src={getImageUrl(movie.backdrop_path)}
          alt={`${movie.title} backdrop`}
          fill
          preload
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,195,113,0.16),transparent_24%),linear-gradient(180deg,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.75)_38%,#000_100%)]" />
      </div>

      <section className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div className="mx-auto w-full max-w-sm lg:mx-0">
            <div className="section-shell overflow-hidden rounded-[2rem]">
              <div className="relative aspect-[0.7]">
                <Image
                  src={getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  fill
                  sizes="(max-width: 1024px) 85vw, 32vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <span className="chip text-sm">
                <PlayCircle className="h-4 w-4" />
                Featured movie
              </span>
              <span className="chip text-sm">
                {formatYearDate(movie.release_date)} release
              </span>
            </div>

            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.34em] text-[var(--color-secondary)]">
                Movie details
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                {movie.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-white/70 sm:text-lg">
                {truncate(
                  movie.overview ||
                    "A cinematic story ready for your next movie night.",
                  360
                )}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="section-shell rounded-[1.5rem] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                  Release date
                </p>
                <p className="mt-3 flex items-center gap-2 text-base font-medium">
                  <CalendarDays className="h-4 w-4 text-[var(--color-secondary)]" />
                  {formatLongDate(movie.release_date)}
                </p>
              </div>
              <div className="section-shell rounded-[1.5rem] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                  Audience rating
                </p>
                <p className="mt-3 flex items-center gap-2 text-base font-medium">
                  <Star className="h-4 w-4 text-[var(--color-secondary)]" />
                  {movie.vote_average.toFixed(1)} / 10
                </p>
              </div>
              <div className="section-shell rounded-[1.5rem] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                  Booking flow
                </p>
                <p className="mt-3 text-base font-medium text-white">
                  Pick seats in a few taps
                </p>
              </div>
            </div>

            <div className="section-shell rounded-[2rem] p-6 sm:p-7">
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                    Ready to go
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold">
                    Book seats for a smoother movie night
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/65">
                    Head to the booking screen to choose seats, confirm your
                    email, and keep everything organized in your tickets page.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={{
                      pathname: "/booking-tickets",
                      query: { movie_id: movie.id, movie_title: movie.title },
                    }}
                    className="button-primary px-6 py-3 text-sm sm:text-base"
                  >
                    <Ticket className="h-4 w-4" />
                    Book tickets
                  </Link>
                  <Link
                    href="/booked-tickets"
                    className="button-secondary px-6 py-3 text-sm sm:text-base"
                  >
                    View my tickets
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
