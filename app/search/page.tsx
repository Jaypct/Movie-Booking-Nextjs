import { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";

interface Props {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const rawQuery = resolvedSearchParams?.query;
  const query = (Array.isArray(rawQuery) ? rawQuery[0] : rawQuery)?.trim();

  if (!query) {
    return <p className="mt-20 text-center">Please enter a search term.</p>;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/search?query=${encodeURIComponent(query)}`,
    { next: { revalidate: 60 } }, // optional caching
  );

  const data: { results: Movie[] } = await res.json();

  if (!data.results || data.results.length === 0) {
    return (
      <p className="mt-20 text-center">{`No results found for "${query}"`}</p>
    );
  }

  return (
    <div className="container mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
      {data.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
