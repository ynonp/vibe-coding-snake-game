import type { Apple } from "@/types/game";
import { coordinatesToStyle } from '@/lib/utils';

/**
 * Renders the apple using DOM objects
 * The apple should be a div with a class name of 'apple'
 * A regular apple should be painted red, a super apple should be painted green
 */
export default function Apple({ apple }: { apple: Apple }) {
  return (
    <div
      className={`w-5 h-5 inline-block absolute text-2xl ${apple.type === 'gold' ? 'text-yellow-500' : 'text-red-600'}`}
      style={coordinatesToStyle(apple.body)}
    >
      {apple.type === 'gold' ? '🌟' : '🍎'}
    </div>
  )
}