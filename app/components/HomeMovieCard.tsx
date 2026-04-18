import { ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatYearDate, getImageUrl, truncate } from "../lib/utils";
import { Movie } from "../types/movie";

export default function HomeMovieCard({ movie }: { movie: Movie }) {
  return (
    <article className="group h-full">
      <Link
        href={`/movie/${movie.id}`}
        className="section-shell block h-full overflow-hidden rounded-[1.75rem] transition duration-300 hover:-translate-y-1 hover:border-white/18"
      >
        <div className="relative aspect-[0.72] overflow-hidden">
          <Image
            src={getImageUrl(movie.poster_path ?? "")}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 18vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-slate-950/75 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            <Star className="h-3.5 w-3.5 text-[var(--color-secondary)]" />
            {movie.vote_average.toFixed(1)}
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                {formatYearDate(movie.release_date)}
              </p>
              <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-white">
                {movie.title}
              </h3>
            </div>
            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-white/45 transition group-hover:text-white" />
          </div>

          <p className="mt-3 text-sm leading-6 text-white/62">
            {truncate(
              movie.overview || "Tap through for show details and booking.",
              92,
            )}
          </p>

          <p className="mt-4 text-xs font-medium text-[var(--color-secondary)]">
            View details and booking
          </p>
          <p className="text-xs text-gray-400">
            {formatYearDate(movie.release_date)}
          </p>
        </div>
      </Link>
    </article>
  );
}
