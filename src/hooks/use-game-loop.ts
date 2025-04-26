import { useEffect } from "react";

export default function useGameLoop({
  update,
  isRunning
}: {
  update: () => void;
  isRunning: boolean;
}) {
  let animationFrame: number;

  function tick() {
    if (isRunning) {
      update();
      animationFrame = requestAnimationFrame(tick);
    } 
  }

  useEffect(() => {
    tick();
    return () => cancelAnimationFrame(animationFrame);
  }, [isRunning]);
}
