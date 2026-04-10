import { TMDB_BASE_URL, REGION } from "./constants";
import { fetcher } from "./fetcher";
import { Movie } from "./types";

const API_KEY = process.env.TMDB_API_KEY;

export async function getNowPlaying(): Promise<Movie[]> {
  const data = await fetcher<{ results: Movie[] }>(
    `${TMDB_BASE_URL}/movie/now_playing?api_key=${API_KEY}&region=${REGION}`,
    60, // cache 60 seconds
  );
  return data.results;
}

export async function getPopular(): Promise<Movie[]> {
  const data = await fetcher<{ results: Movie[] }>(
    `${TMDB_BASE_URL}/movie/popular?api_key=${API_KEY}&region=${REGION}`,
    60, // cache 60 seconds
  );
  return data.results;
}

export async function getUpcoming(): Promise<Movie[]> {
  const data = await fetcher<{ results: Movie[] }>(
    `${TMDB_BASE_URL}/movie/upcoming?api_key=${API_KEY}&region=${REGION}`,
    300, // cache 5 minutes
  );
  return data.results;
}

export async function searchMovies(query: string) {
  const res = await fetch(
    `${TMDB_BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`,
    { next: { revalidate: 60 } }, // cache for 60 seconds
  );

  if (!res.ok) throw new Error("Search failed");

  return res.json();
}

export async function getMovieDetails(id: string): Promise<Movie> {
  const data = await fetcher<Movie>(
    `${TMDB_BASE_URL}/movie/${id}?api_key=${API_KEY}`,
    300, // cache 5 minutes
  );
  return data;
}
