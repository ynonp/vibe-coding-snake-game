'use client';

import useSnake from "@/hooks/use-snake";

/**
 * Create a Snake game client component
 */
export default function Game() {
  const snake = useSnake();
  const apple = useApple();
  const areColliding = useCollisionDetection(snake.body, apple.body);
  
  if (areColliding) {

  }

  return (
    <div>
      <h1>Snake</h1>      
      <Snake snake={snake} />
      <Apple apple={apple} />
    </div>
  )    
}