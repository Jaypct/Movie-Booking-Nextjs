import { getNowPlaying, getPopular, getUpcoming } from "@/app/lib/tmdb";
import LandingPageContent from "./components/LandingPageContent";

export default async function Page() {
  const [nowPlaying, upcoming, popular] = await Promise.all([
    getNowPlaying(),
    getUpcoming(),
    getPopular(),
  ]);

  return (
    <LandingPageContent
      nowPlaying={nowPlaying}
      popular={popular}
      upcoming={upcoming}
    />
  );
}
