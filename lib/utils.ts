import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getInitials = (name: string) => name.split(" ").map((n) => n[0]).join("").toString().toUpperCase(
);

export const getCurrentDate = () => new Date().toISOString().slice(0, 10);
