import SeatSelector from "@/app/components/SeatSelector";
import { getMovieDetails } from "@/app/lib/tmdb";
import { getImageUrl } from "@/app/lib/utils";

interface Props {
  params: { id: string };
}

const Movie = async ({ params }: Props) => {
  //
  const { id } = await params;
  const movie = await getMovieDetails(id);

  return (
    <div className="relative mt-20 min-h-screen overflow-hidden text-white">
      <img
        src={getImageUrl(movie.backdrop_path)}
        alt={`${movie.title} backdrop`}
        className="pointer-events-none absolute inset-0 h-[60vh] w-full object-cover opacity-50"
      />
      <div className="pointer-events-none absolute inset-0 h-[60vh] bg-gradient-to-b from-black/30 via-black/70 to-black" />
      <div className="container relative mx-auto">
        <div className="flex flex-col gap-6 pt-8 md:flex-row md:pt-16">
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-full md:w-1/3 rounded-xl shadow-md"
          />
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <p className="text-gray-400">{movie.release_date}</p>
            <p>{movie.overview}</p>
            <p className="text-yellow-400 font-semibold">
              Rating: {movie.vote_average}/10
            </p>
          </div>
        </div>
      </div>
      <SeatSelector />
    </div>
  );
};

export default Movie;
