'use client';
import isColliding from "@/lib/is-colliding";
import useSnake from "@/hooks/use-snake";
import useGameLoop from "@/hooks/use-game-loop";
import useApple from "@/hooks/use-apple";
/**
 * Create a Snake game client component
 */
export default function Game() {
  const snake = useSnake();
  const apple = useApple();
  const snakeEatsApple = isColliding(snake.body, apple.body);
  const GAME_SPEED = 1;  // move the snake 1 step every second
  
  const gameLoop = useGameLoop();
  
  if (snakeEatsApple) {

  }

  return (
    <div>
      <h1>Snake</h1>      
      <Snake snake={snake} />
      <Apple apple={apple} />
    </div>
  )    
}