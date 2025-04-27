import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from '@/app/game';
import '@testing-library/jest-dom';

// Mock the hooks with variable implementation that can be changed per test
const mockSnake = {
  body: [{ x: 10, y: 10 }],
  direction: 'right' as const,
  isDead: false,
  update: vi.fn(),
  grow: vi.fn(),
  reset: vi.fn(),
};

vi.mock('@/hooks/use-snake', () => ({
  default: () => mockSnake,
}));

vi.mock('@/hooks/use-apple', () => ({
  default: () => ({
    body: { x: 15, y: 15 },
    type: 'regular',
    reposition: vi.fn(),
  }),
}));

vi.mock('@/hooks/use-game-loop', () => ({
  default: () => vi.fn(),
}));

vi.mock('@/lib/is-colliding', () => ({
  default: () => false,
}));

describe('Snake Game Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Reset snake state before each test
    mockSnake.isDead = false;
  });

  it('renders the game component correctly', () => {
    render(<Game />);
    expect(screen.getByText('Snake Game')).toBeInTheDocument();
    expect(screen.getByText('Score:')).toBeInTheDocument();
    expect(screen.getByText('High Score:')).toBeInTheDocument();
    expect(screen.getByText('Start Game')).toBeInTheDocument();
  });

  it('toggles play state when button is clicked', () => {
    render(<Game />);
    const playButton = screen.getByText('Start Game');
    
    fireEvent.click(playButton);
    expect(screen.getByText('Pause Game')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Pause Game'));
    expect(screen.getByText('Start Game')).toBeInTheDocument();
  });

  it('displays the game over screen when snake is dead', () => {
    // Set the snake to dead state
    mockSnake.isDead = true;
    
    render(<Game />);
    expect(screen.getByText('Game Over!')).toBeInTheDocument();
    expect(screen.getByText('Play Again')).toBeInTheDocument();
  });
}); 