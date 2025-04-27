import { Coordinates, GameObject } from "@/types/game";

export default function isColliding(object1: GameObject, object2: GameObject): boolean {
  // If object1 is an array of coordinates (snake), check if any segment collides with object2
  if (Array.isArray(object1)) {
    // If object2 is a single coordinate (apple)
    if (!Array.isArray(object2)) {
      return object1.some(segment => 
        segment.x === object2.x && segment.y === object2.y
      );
    }
    // If both are arrays, check for any collision between segments
    return object1.some(segment1 => 
      (object2 as Coordinates[]).some(segment2 => 
        segment1.x === segment2.x && segment1.y === segment2.y
      )
    );
  }
  
  // If object1 is a single coordinate
  if (!Array.isArray(object2)) {
    // Both are single coordinates
    return object1.x === object2.x && object1.y === object2.y;
  }
  
  // object1 is single, object2 is array
  return (object2 as Coordinates[]).some(segment => 
    segment.x === object1.x && segment.y === object1.y
  );
}