import { useEffect } from "react";

export default function useGameLoop({
  update,
  isRunning
}: {
  update: (ms: number) => void;
  isRunning: boolean;
}) {
  let animationFrame: number;
  let startTime = performance.now();

  function tick() {
    if (isRunning) {
      const timeSinceGameStarted = performance.now() - startTime;
      update(timeSinceGameStarted);
      animationFrame = requestAnimationFrame(tick);
    } 
  }

  useEffect(() => {
    tick();
    return () => cancelAnimationFrame(animationFrame);
  }, [isRunning]);
}
