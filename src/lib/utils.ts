import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Coordinates } from "@/types/game";
export const CELL_SIZE = 20;
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function coordinatesToStyle(coordinates: Coordinates): {
  top: number,
  left: number,
} {
  const top = coordinates.y * CELL_SIZE;
  const left = coordinates.x * CELL_SIZE;
  return {top, left}
}
