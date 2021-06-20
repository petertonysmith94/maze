import Maze from '../Models/Maze';
import MazeSolution from '../Models/MazeSolution';
import Point from '../Models/Point';

interface Solver {
  /**
   * Solves a given maze, returning a solution or null if no solution can be found
   * 
   * @param {Maze} maze 
   * @param {Point} start 
   * @param {Point} finish 
   * @returns {MazeSolution | null}
   */
  solve(maze: Maze, start: Point, finish: Point): MazeSolution | null;
}

export default Solver;
