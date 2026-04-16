"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Movie } from "../types/movie";
import { formatDate, getImageUrl } from "../lib/utils";

export default function Hero({ movieList }: { movieList: Movie[] }) {
  const [current, setCurrent] = useState(0);

  if (!movieList || movieList.length === 0) {
    return <p className="text-white p-5">Loading...</p>;
  }

  // Auto change every 5 seconds (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movieList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [movieList]);

  const movie = movieList[current];

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="relative min-h-[50vh] w-full overflow-hidden text-white">
        {/* Background Image */}
        <img
          src={getImageUrl(movie.backdrop_path)}
          className="absolute w-full h-full object-cover pointer-events-none -z-20"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent pointer-events-none -z-10" />
        <div className="absolute z-10 p-10 max-w-xl bottom-0">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <div className="flex items-center gap-3 text-sm text-gray-300 mb-3">
            <p>{formatDate(movie.release_date)}</p>
          </div>
        </div>

        {/* Content */}
        {/* <div className="absolute z-10 p-10 max-w-xl bottom-0">
        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
        <div className="flex items-center gap-3 text-sm text-gray-300 mb-3">
          <span>📺 {movie.format}</span>

          <span>⏱ {movie.duration ?? "?"}m</span>

          <span>📅 {releaseDate ?? "Unknown"}</span>

          <span className="bg-green-600 px-2 py-1 rounded text-xs">
            ⭐ {rating}
          </span>

          <span className="bg-gray-700 px-2 py-1 rounded text-xs">
            {movie.isAdult ? "R18" : "PG-13"}
          </span>
        </div>

        <p className="text-gray-300 line-clamp-3">
          {" "}
          {movie.description?.replace(/<[^>]*>/g, "")}
        </p>
        <Link href={`/movie/${movie.id}`}>
          {" "}
          <button className="button-color px-6 py-3 rounded-full cursor-pointer mt-5">
            ▶ Watch Now
          </button>
        </Link>
      </div> */}
      </div>
    </Link>
  );
}
