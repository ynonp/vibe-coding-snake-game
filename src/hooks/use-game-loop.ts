import type { RefObject } from 'react';
import { useRef, useEffect } from "react";

function gameLoop(
  nextAnimationFrameRef: RefObject<number>,
  lastTime: number,
  accumulatorRef: RefObject<number>,
  updatesPerSecond: number,
  update: () => void,
) {
  const timeStep = 1 / updatesPerSecond;
  const currentTime = performance.now();
  let deltaTime = (currentTime - lastTime) / 1000;
  accumulatorRef.current += deltaTime;

  while (accumulatorRef.current >= timeStep) {
    update();
    accumulatorRef.current -= timeStep;
  }
  nextAnimationFrameRef.current = requestAnimationFrame(() => gameLoop(nextAnimationFrameRef, currentTime, accumulatorRef, updatesPerSecond, update));
}

export default function useGameLoop(
 updatesPerSecond: number,
 update: () => void,
) {
  let accumulatorRef = useRef(0); 
  const nextAnimationFrameRef = useRef(0);

  useEffect(() => {
    if (updatesPerSecond > 0) {
      gameLoop(nextAnimationFrameRef, performance.now(), accumulatorRef, updatesPerSecond, update) 
      return () => {
        cancelAnimationFrame(nextAnimationFrameRef.current);
      }  
    }
  }, [updatesPerSecond, update])  
}
