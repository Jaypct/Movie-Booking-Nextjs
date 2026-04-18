import { CalendarDays, Sparkles, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/app/lib/utils";
import { Movie } from "@/app/types/movie";
import HomeMovieCard from "./HomeMovieCard";
import LandingHero from "./LandingHero";

type LandingPageContentProps = {
  nowPlaying: Movie[];
  popular: Movie[];
  upcoming: Movie[];
};

export default function LandingPageContent({
  nowPlaying,
  popular,
  upcoming,
}: LandingPageContentProps) {
  const featuredMovie = popular[0] ?? nowPlaying[0];
  const experienceHighlights = [
    {
      title: "Browse by mood, not by stress",
      description:
        "The homepage now guides people toward what is worth watching tonight or saving for later.",
      icon: Sparkles,
    },
    {
      title: "Book faster",
      description:
        "Quick calls to action help visitors go from curiosity to seat selection without hunting around.",
      icon: Ticket,
    },
    {
      title: "Plan the next outing",
      description:
        "Upcoming releases keep future movie nights on the radar for families, couples, and groups.",
      icon: CalendarDays,
    },
  ];

  return (
    <main className="page-shell min-h-screen bg-black pb-20 text-white">
      <LandingHero movieList={nowPlaying.slice(0, 6)} />

      <div className="relative z-10 mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="section-shell grid gap-4 rounded-[2rem] p-4 sm:p-6 lg:grid-cols-3">
          {experienceHighlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-[1.5rem] border border-white/8 bg-white/5 p-5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/8 text-[var(--color-secondary)]">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  {item.description}
                </p>
              </div>
            );
          })}
        </section>

        {featuredMovie ? (
          <section
            id="popular"
            className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="section-shell relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
              <div className="absolute inset-0">
                <Image
                  src={getImageUrl(featuredMovie.backdrop_path)}
                  alt={`${featuredMovie.title} preview`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/90 to-slate-950/45" />
              </div>

              <div className="relative">
                <span className="chip text-sm">
                  <Sparkles className="h-4 w-4 text-[var(--color-secondary)]" />
                  Popular right now
                </span>
                <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-tight sm:text-4xl">
                  Movie nights should feel exciting, not overwhelming.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
                  Explore current releases, glance at what is trending, and move
                  into booking with a layout that feels calm, clear, and made
                  for real people.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/movie/${featuredMovie.id}`}
                    className="button-primary px-6 py-3 text-sm sm:text-base"
                  >
                    Start with {featuredMovie.title}
                  </Link>
                  <Link
                    href="/#upcoming"
                    className="button-secondary px-6 py-3 text-sm sm:text-base"
                  >
                    See what is coming soon
                  </Link>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[1.5rem] border border-white/8 bg-white/5 p-4">
                    <p className="text-2xl font-semibold">
                      {nowPlaying.length}
                    </p>
                    <p className="mt-1 text-sm text-white/60">
                      Fresh titles live now
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/8 bg-white/5 p-4">
                    <p className="text-2xl font-semibold">{popular.length}</p>
                    <p className="mt-1 text-sm text-white/60">
                      Crowd favorites to browse
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/8 bg-white/5 p-4">
                    <p className="text-2xl font-semibold">{upcoming.length}</p>
                    <p className="mt-1 text-sm text-white/60">
                      Upcoming releases ahead
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {popular.slice(0, 4).map((movie) => (
                <HomeMovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        ) : null}

        <section id="now-playing" className="mt-10">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.32em] text-[var(--color-secondary)]">
                Now playing
              </p>
              <h2 className="mt-2 text-3xl font-semibold">
                Pick tonight&apos;s movie without second guessing
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-white/62">
              A cleaner card layout makes it easier to compare what is live now
              and jump into the title that fits the mood.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {nowPlaying.map((movie) => (
              <HomeMovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        <section id="upcoming" className="mt-12">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.32em] text-[var(--color-secondary)]">
                Coming soon
              </p>
              <h2 className="mt-2 text-3xl font-semibold">
                Keep the next movie night on the calendar
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-white/62">
              Upcoming titles now feel like part of the journey instead of an
              afterthought, so visitors can plan ahead with confidence.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {upcoming.map((movie) => (
              <HomeMovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
