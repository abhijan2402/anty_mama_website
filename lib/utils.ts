import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageUrl = (path: any) => {
  if (!path) return "";

  const pathStr = typeof path === "string" ? path : path.url || path.path || "";

  if (!pathStr) return "";

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || "";

  const fullUrl = pathStr.startsWith("http")
    ? pathStr
    : `${baseUrl}/${pathStr.replace(/^\//, "")}`;

  return fullUrl;
};
