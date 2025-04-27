export type GameObject = Coordinates | Array<Coordinates>;

export type Snake = {
  body: Array<Coordinates>;
  direction: Direction;
  update: () => void,
  grow: (addition: number) => void,
};

export type Apple = {
  body: Coordinates;
  type: 'regular' | 'gold'
};

export type Coordinates = {
  x: number;
  y: number;
};

export type Direction = 'up' | 'down' | 'left' | 'right';

export type GameState = {
  snake: Snake;
  food: Coordinates;
  gameOver: boolean;
};

export type GameConfig = {
  width: number;
  height: number;
  gameOver: boolean;
  speed: number;
}
