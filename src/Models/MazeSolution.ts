import Maze from './Maze';
import Point from './Point';

interface MazeSolution {
  generated: Maze;
  start: Point;
  finish: Point;
  solution: Maze;
  path: Point[];
}

export default MazeSolution;