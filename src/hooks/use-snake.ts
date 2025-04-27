import { Coordinates, Direction, Snake } from "@/types/game";
import { useState } from "react";

/**
 * Creates a new snake object
 * Bind keyboard events to move the snake
 */
export default function useSnake(): Snake {
  const [body, setBody] = useState([{x: 20, y: 20}]);
  const [direction, setDirection] = useState<Direction>('right');
  const [grow, setGrow] = useState(2);

  return {
    body: body,
    direction,
    update: () => {
      setBody(body => moveBody(body, direction, grow))
      if (grow > 0) {
        setGrow(g => g - 1);
      }
    },
    grow: (addition: number) => {
      setGrow(g => g + addition)
    }
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