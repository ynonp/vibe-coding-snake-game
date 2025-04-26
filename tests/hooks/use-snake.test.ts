import { useSnake } from '@/hooks/use-snake';
import { describe, it, expect } from 'vitest';

describe('useSnake', () => {
  it('should return a snake object', () => {
    const snake = useSnake();
    expect(snake.body).toBeDefined();
  });
});
