export function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

export function formatLongDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
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
