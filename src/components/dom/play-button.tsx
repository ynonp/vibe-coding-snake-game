export default function PlayButton({
  isPlaying,
  toggle
}: {
  isPlaying: boolean,
  toggle: () => void,
}) {
  return (
    <button 
      onClick={toggle}
      className={`px-6 py-2 rounded-lg text-white font-bold transition-colors ${
        isPlaying 
          ? 'bg-red-500 hover:bg-red-600' 
          : 'bg-green-500 hover:bg-green-600'
      }`}
    >
      {isPlaying ? 'Pause Game' : 'Start Game'}
    </button>
  )
}