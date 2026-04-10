import { getNowPlaying, getPopular, getUpcoming } from "@/app/lib/tmdb";
import MovieCard from "./components/MovieCard";
import Hero from "./components/Hero";

export default async function Page() {
  const [nowPlaying, upcoming, popular] = await Promise.all([
    getNowPlaying(),
    getUpcoming(),
    getPopular(),
  ]);

  return (
    <div className="container mx-auto mt-20 space-y-10">
      {/* Hero Section */}
      <div>
        <Hero movieList={nowPlaying} />
      </div>

      {/* 🎬 NOW PLAYING */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Now Playing 🎬</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {nowPlaying.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>

      {/* 🗓️ UPCOMING */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Upcoming 🍿</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {upcoming.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
