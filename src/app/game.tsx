'use client';
import isColliding from "@/lib/is-colliding";
import useSnake from "@/hooks/use-snake";
import useGameLoop from "@/hooks/use-game-loop";
import useApple from "@/hooks/use-apple";
import Snake from "@/components/dom/snake";
import Apple from "@/components/dom/apple";
import PlayButton from "@/components/dom/play-button";
import { useState } from "react";
/**
 * Create a Snake game client component
 */
export default function Game() {
  const [isPlaying, setIsPlaying] = useState(false);
  const snake = useSnake();
  const apple = useApple();
  const snakeEatsApple = isColliding(snake.body, apple.body);
  const GAME_SPEED = 2;  // move the snake 1 step every second
  
  const gameLoop = useGameLoop(isPlaying ? GAME_SPEED : 0, () => {
    snake.update();
  });
  
  if (snakeEatsApple) {
  }

  return (
    <div>
      <h1>Snake</h1>    
      <PlayButton isPlaying={isPlaying} toggle={() => setIsPlaying(p => !p)} />
      <div className="border-purple-600 border w-[800px] h-[600px] relative mx-auto">
        <Snake snake={snake} />
        <Apple apple={apple} />
      </div>        
    </div>
  )    
}