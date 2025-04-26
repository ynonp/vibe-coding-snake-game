export default function useGameLoop({
  speed = 1,
  onTick,
  isRunning = true
}: {
  speed?: number;
  onTick: () => void;
  isRunning?: boolean;
}) {
}
