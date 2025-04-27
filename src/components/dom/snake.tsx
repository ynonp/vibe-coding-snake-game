import type { Snake, Coordinates } from "@/types/game";
import { coordinatesToStyle } from '@/lib/utils';
/**
 * Renders the snake using DOM objects
 * Each snake part should be a div with a class name of 'snake'
 */


export default function Snake({ snake }: { snake: Snake }) {
  return (
    <>
      {snake.body.map((c, i) => (
        <div        
          key={i}
          className='w-5 h-5 bg-amber-900 absolute m-0 p-0'
          style={coordinatesToStyle(c)}
        />
      ))}
    </>
  )
}