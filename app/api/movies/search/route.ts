import { searchMovies } from "@/app/lib/tmdb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return new Response(JSON.stringify({ message: "Query required" }), {
      status: 400,
    });
  }
  try {
    const data = await searchMovies(query);

    return Response.json({
      results: data.results,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Search failed" }), {
      status: 500,
    });
  }
}
