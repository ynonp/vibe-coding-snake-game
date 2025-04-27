import { Apple, Coordinates } from "@/types/game";
import { useState } from "react";
import { CELL_SIZE } from "@/lib/utils";

// Calculate grid size based on game area dimensions (800x600) and cell size (20)
const GRID_WIDTH = Math.floor(800 / CELL_SIZE);
const GRID_HEIGHT = Math.floor(600 / CELL_SIZE);

/**
 * Returns an apple object
 * When an apple is eaten its position and type should be randomized
 */
export default function useApple(): Apple & { reposition: (avoidPositions?: Coordinates[]) => void } {
  const [position, setPosition] = useState<Coordinates>({ x: 4, y: 4 });
  const [type, setType] = useState<'regular' | 'gold'>('regular');
  
  const reposition = (avoidPositions: Coordinates[] = []) => {
    // Generate random position that doesn't overlap with the snake
    let newPosition: Coordinates;
    do {
      newPosition = {
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT)
      };
    } while (
      avoidPositions.some(pos => pos.x === newPosition.x && pos.y === newPosition.y)
    );
    
    setPosition(newPosition);
    
    // 20% chance for gold apple
    setType(Math.random() < 0.2 ? 'gold' : 'regular');
  };

  return {
    body: position,
    type,
    reposition
  };
}
