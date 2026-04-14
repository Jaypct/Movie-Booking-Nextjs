"use client";

import Link from "next/link";
import { getImageUrl } from "../lib/utils";
import { Movie } from "../types/movie";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="bg-gray-900 text-white rounded-xl overflow-hidden shadow-md hover:scale-105 transition cursor-pointer">
      <Link href={`/movie/${movie.id}`}>
        <img
          src={getImageUrl(movie.poster_path ?? "")}
          alt={movie.title}
          className="w-fit"
        />

        <div className="p-3">
          <h3 className="font-bold text-sm">{movie.title}</h3>
          <p className="text-xs text-gray-400">{movie.release_date}</p>
        </div>
      </Link>
    </div>
  );
}
