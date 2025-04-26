import { useEffect } from "react";

export default function useGameLoop({
  update,
  isRunning
}: {
  update: () => void;
  isRunning: boolean;
}) {
  useEffect(() => {
    if (isRunning) {
      const animationFrame = requestAnimationFrame(update);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isRunning]);
}
