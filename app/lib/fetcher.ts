export async function fetcher<T>(
  url: string,
  revalidateSeconds?: number,
): Promise<T> {
  const res = await fetch(url, {
    next: revalidateSeconds ? { revalidate: revalidateSeconds } : undefined,
  });

  if (!res.ok) {
    throw new Error(`Fetch failed with status ${res.status}`);
  }

  return res.json() as Promise<T>;
}
