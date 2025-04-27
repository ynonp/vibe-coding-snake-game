export default function PlayButton({
  isPlaying,
  toggle
}: {
  isPlaying: boolean,
  toggle: () => void,
}) {
  return (
    <button onClick={toggle}>
      {isPlaying ? 'Stop' : 'Start'}
    </button>
  )
}