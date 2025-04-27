import { Apple, GameObject } from "@/types/game";

/**
 * Returns an apple object
 * When an apple is eaten its position and type should be randomized
 */
export default function useApple(): Apple {
  return {
    body: {x: 4, y: 4},
    type: 'regular',
  }
}
