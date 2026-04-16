export function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

export function formatYearDate(date: string) {
  return new Date(date).getFullYear();
}

export function truncate(text: string, length = 100) {
  return text.length > length ? text.slice(0, length) + "..." : text;
}

export function getImageUrl(path?: string | null) {
  if (!path) return "/placeholderImg.webp"; // fallback image
  return `https://image.tmdb.org/t/p/w500${path}`;
}
