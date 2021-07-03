import Maze from '../Models/Maze';
import MazeSolution from '../Models/MazeSolution';
import Point from '../Models/Point';
import Solver from './Solver';
import InvalidArgumentException from '../Exceptions/InvalidArgumentException';
import { injectable } from 'inversify';

@injectable()
abstract class BaseSolver implements Solver {
  /**
   * @inheritdoc
   */
  abstract solve(maze: Maze, start: Point, finish: Point): MazeSolution | null;

  /**
   * Validate that the start and finish points within limits
   * 
   * @param {Maze} maze 
   * @param {Point} start 
   * @param {Point} end 
   * 
   * @throws {InvalidArgumentException}
   */
  protected validate(maze: Maze, start: Point, end: Point): void {
    if (!start.withBounds(maze.width, maze.height)) {
      throw new InvalidArgumentException(
        'The starting point lies outside the maze bounds.'
      )
    }

    if (!end.withBounds(maze.width, maze.height)) {
      throw new InvalidArgumentException(
        'The starting point lies outside the maze bounds.'
      )
    }
  }
}

export default BaseSolver;