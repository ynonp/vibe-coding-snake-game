'use client';
import isColliding from "@/lib/is-colliding";
import useSnake from "@/hooks/use-snake";
import useGameLoop from "@/hooks/use-game-loop";
import useApple from "@/hooks/use-apple";
import Snake from "@/components/dom/snake";
import Apple from "@/components/dom/apple";
import PlayButton from "@/components/dom/play-button";
import { useState, useEffect } from "react";

/**
 * Create a Snake game client component
 */
export default function Game() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const snake = useSnake();
  const apple = useApple();
  
  // Game speed increases as score increases
  const baseSpeed = 2;
  const speedIncrease = Math.min(5, Math.floor(score / 10));
  const GAME_SPEED = baseSpeed + speedIncrease;
  
  // Check collisions
  const snakeEatsApple = isColliding(snake.body, apple.body);
  
  // Handle game over
  useEffect(() => {
    if (snake.isDead && isPlaying) {
      setIsPlaying(false);
      if (score > highScore) {
        setHighScore(score);
      }
    }
  }, [snake.isDead, isPlaying, score, highScore]);
  
  // Reset game when starting
  const togglePlay = () => {
    if (!isPlaying) {
      snake.reset();
      apple.reposition(snake.body);
      setScore(0);
    }
    setIsPlaying(prev => !prev);
  };
  
  // Game loop
  const gameLoop = useGameLoop(isPlaying ? GAME_SPEED : 0, () => {
    snake.update();
  });
  
  // Handle snake eating apple
  if (snakeEatsApple) {
    // Increase score based on apple type
    const points = apple.type === 'gold' ? 5 : 1;
    setScore(prevScore => prevScore + points);
    
    // Grow snake
    const growAmount = apple.type === 'gold' ? 3 : 1;
    snake.grow(growAmount);
    
    // Reposition apple
    apple.reposition(snake.body);
  }

  return (
    <div className="text-center py-8">
      <h1 className="text-3xl font-bold mb-4">Snake Game</h1>    
      
      <div className="flex justify-center gap-8 mb-4">
        <div className="text-xl">Score: <span className="font-bold">{score}</span></div>
        <div className="text-xl">High Score: <span className="font-bold">{highScore}</span></div>
      </div>
      
      <div className="mb-4">
        <PlayButton 
          isPlaying={isPlaying} 
          toggle={togglePlay} 
        />
      </div>
      
      <div className="border-purple-600 border-2 w-[800px] h-[600px] relative mx-auto bg-gray-100">
        <Snake snake={snake} />
        <Apple apple={apple} />
        
        {snake.isDead && !isPlaying && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
            <div className="text-white text-4xl font-bold mb-4">Game Over!</div>
            <div className="text-white text-2xl mb-6">Score: {score}</div>
            <button 
              onClick={togglePlay}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Use arrow keys or WASD to control the snake</p>
      </div>
    </div>
  )    
}