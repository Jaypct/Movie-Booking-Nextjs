import { searchMovies } from "@/app/lib/tmdb";
import { ratelimit } from "@/app/lib/rateLimiter";

export async function GET(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "anonymous";

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return Response.json({ message: "Too many requests" }, { status: 429 });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return Response.json({ message: "Query required" }, { status: 400 });
  }

  try {
    const data = await searchMovies(query);
    return Response.json(
      { results: data?.results ?? [] },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
        },
      },
    );
  } catch (error) {
    return Response.json({ message: "Search failed" }, { status: 500 });
  }
}
