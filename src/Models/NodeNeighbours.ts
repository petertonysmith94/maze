import Node from './Node';

type Direction = keyof Omit<Node, 'coordinate' | 'render'>;

const Neighbours: Array<Direction> = ['north', 'east', 'south', 'west'];

const DiagonalNeighbours: Array<Direction> = [];

function getOpposite (direction:Direction): Direction {
  switch (direction) {
    case 'north': return 'south';
    case 'east':  return 'west';
    case 'south': return 'north';
    case 'west':  return 'east';
    default:      throw new Error('Can\'t obtain opposite direction');
  }
}

export {
  Neighbours as default,
  DiagonalNeighbours,
  Direction,
  getOpposite
};