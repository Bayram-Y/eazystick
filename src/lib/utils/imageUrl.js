export const getImageUrl = (path) => {
  const base = import.meta.env.VITE_FILE_BASE_URL;

  if (!path) return "/images/default.png";

  return path.startsWith("/")
    ? `${base}${path}`
    : `${base}/${path}`;
};