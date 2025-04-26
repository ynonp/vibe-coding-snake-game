import { GameObject } from "@/types/game";

/**
 * Returns an apple object
 * When an apple is eaten its position and type should be randomized
 */
export default function useApple(): {
  body: GameObject;
  type: 'regular' | 'super';
  eaten: () => void;  
} {
}