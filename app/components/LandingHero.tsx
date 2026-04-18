"use client";

import { CalendarDays, ChevronRight, Play, Star, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatDate, getImageUrl, truncate } from "../lib/utils";
import { Movie } from "../types/movie";

export default function LandingHero({ movieList }: { movieList: Movie[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (movieList.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movieList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movieList.length]);

  if (!movieList.length) {
    return (
      <section className="relative overflow-hidden rounded-b-[2.5rem] bg-black px-4 pb-16 pt-32 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="section-shell rounded-[2rem] p-8 sm:p-10">
            <span className="chip text-sm">Fresh picks loading</span>
            <h1 className="mt-5 text-4xl font-semibold sm:text-5xl">
              Your next movie night is almost ready.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
              We are pulling in the latest releases so the landing page can
              spotlight what is worth booking right now.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const activeIndex = current >= movieList.length ? 0 : current;
  const movie = movieList[activeIndex];
  const quickPicks = movieList.slice(0, 4);

  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden rounded-b-[2.5rem] text-white">
      <div className="absolute inset-0">
        <Image
          key={movie.id}
          src={getImageUrl(movie.backdrop_path)}
          alt={`${movie.title} backdrop`}
          fill
          preload={current === 0}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,195,113,0.24),transparent_28%),linear-gradient(90deg,rgba(3,7,18,0.95)_0%,rgba(3,7,18,0.78)_42%,rgba(3,7,18,0.3)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end gap-8 px-4 pb-10 pt-28 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div className="max-w-2xl pb-4">
          <div className="flex flex-wrap gap-3">
            <span className="chip text-sm">
              <Play className="h-4 w-4" />
              Featured tonight
            </span>
            <span className="chip text-sm text-white/80">
              {movieList.length}+ fresh picks waiting
            </span>
          </div>

          <div className="mt-6 max-w-xl">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-[var(--color-secondary)]">
              Friendly movie booking
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              {movie.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
              {truncate(
                movie.overview ||
                  "Discover a film worth gathering for, then jump from browsing to booking in a few taps.",
                185,
              )}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/80">
            <span className="chip">
              <CalendarDays className="h-4 w-4 text-[var(--color-secondary)]" />
              {formatDate(movie.release_date)}
            </span>
            <span className="chip">
              <Star className="h-4 w-4 text-[var(--color-secondary)]" />
              {movie.vote_average.toFixed(1)} / 10 rating
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/movie/${movie.id}`}
              className="button-primary px-6 py-3 text-sm sm:text-base"
            >
              <Ticket className="h-4 w-4" />
              Book this movie
            </Link>
            <Link
              href="/#now-playing"
              className="button-secondary px-6 py-3 text-sm sm:text-base"
            >
              Explore now playing
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="w-full max-w-md">
          <div className="glass-strong rounded-[2rem] p-4 sm:p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">
                  Quick picks
                </p>
                <h2 className="mt-2 text-xl font-semibold">
                  Find something everyone will say yes to
                </h2>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">
                Swipe the vibe
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {quickPicks.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrent(index)}
                  className={`flex w-full items-center gap-3 rounded-[1.4rem] border p-3 text-left transition ${
                    activeIndex === index
                      ? "border-white/20 bg-white/10"
                      : "border-white/8 bg-white/5 hover:border-white/20 hover:bg-white/8"
                  }`}
                >
                  <div className="relative h-20 w-14 overflow-hidden rounded-2xl">
                    <Image
                      src={getImageUrl(item.poster_path)}
                      alt={item.title}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-white/55">
                      {formatDate(item.release_date)}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-white/45" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
