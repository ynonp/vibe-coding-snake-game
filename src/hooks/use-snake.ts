import { Coordinates, Direction, Snake } from "@/types/game";
import { useState, useEffect, useCallback } from "react";
import { CELL_SIZE } from "@/lib/utils";

// Calculate grid size based on game area dimensions
const GRID_WIDTH = Math.floor(800 / CELL_SIZE);
const GRID_HEIGHT = Math.floor(600 / CELL_SIZE);

/**
 * Creates a new snake object
 * Bind keyboard events to move the snake
 */
export default function useSnake(): Snake & { reset: () => void, isDead: boolean } {
  const [body, setBody] = useState<Coordinates[]>([{x: 20, y: 20}]);
  const [direction, setDirection] = useState<Direction>('right');
  const [grow, setGrow] = useState(2);
  const [isDead, setIsDead] = useState(false);
  
  // Reset snake to initial state
  const reset = useCallback(() => {
    setBody([{x: 20, y: 20}]);
    setDirection('right');
    setGrow(2);
    setIsDead(false);
  }, []);

  // Handle keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyMap: Record<string, Direction> = {
        'ArrowUp': 'up',
        'ArrowDown': 'down',
        'ArrowLeft': 'left',
        'ArrowRight': 'right',
        'w': 'up',
        's': 'down',
        'a': 'left',
        'd': 'right',
      };
      
      const newDirection = keyMap[e.key];
      
      // Only change direction if it's not the opposite of current direction
      if (newDirection) {
        const opposites: Record<Direction, Direction> = {
          'up': 'down',
          'down': 'up',
          'left': 'right',
          'right': 'left'
        };
        
        if (opposites[newDirection] !== direction) {
          setDirection(newDirection);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  return {
    body,
    direction,
    isDead,
    update: () => {
      if (isDead) return;
      
      const newBody = moveBody(body, direction, grow);
      const head = newBody[0];
      
      // Check for wall collision
      if (head.x < 0 || head.x >= GRID_WIDTH || head.y < 0 || head.y >= GRID_HEIGHT) {
        setIsDead(true);
        return;
      }
      
      // Check for self collision (skip the last segment if not growing)
      const checkBody = grow > 0 ? newBody.slice(1) : newBody.slice(1, -1);
      if (checkBody.some(segment => segment.x === head.x && segment.y === head.y)) {
        setIsDead(true);
        return;
      }
      
      setBody(newBody);
      if (grow > 0) {
        setGrow(g => g - 1);
      }
    },
    grow: (addition: number) => {
      setGrow(g => g + addition);
    },
    reset
  }
}

function moveBody(body: Array<Coordinates>, direction: Direction, grow: number) {
  const head = body[0];
  const newHead = {
    'right': () => ({x: head.x + 1, y: head.y}),
    'left': () => ({x: head.x - 1, y: head.y}),
    'up': () => ({x: head.x, y: head.y - 1}),
    'down': () => ({x: head.x, y: head.y + 1}),
  }[direction]();
  if (grow > 0) {
    return [newHead, ...body]
  } else {
    return [newHead, ...body.slice(0, body.length - 1)]
  }
}