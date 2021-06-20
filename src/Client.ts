import { injectable, interfaces } from 'inversify';
import container from "./Container/Container";
import Types from "./Container/Types";
import LinkedList from "./Utils/LinkedList";
import GeneratorAlgorithm from "./Generators/GeneratorAlgorithm";
import Maze from './Models/Maze';
import MazeFactory from './Generators/MazeFactory';
import MazeSolution from './Models/MazeSolution';
import Point from './Models/Point';
import SolverAlgorithms from './Solver/SolverAlgorithms';
import Solver from './Solver/Solver';

@injectable()
class Client {
  /**
   * @member {MazeFactory} mazeFactory
   * @private
   */
  private mazeFactory: MazeFactory;


  private solverFactory: interfaces.Factory<Solver>;

  public constructor() {
    this.mazeFactory = container.get<MazeFactory>(Types.MazeFactory);
    this.solverFactory = container.get<interfaces.Factory<Solver>>(Types.SolverFactory);
  }

  /**
   * Generates an iterable maze, showing the sets that the algorithm has performed  
   * 
   * @param {number} width 
   * @param {number} height 
   * @param {GeneratorAlgorithm} algorithm 
   * @returns {Maze}
   */
  public generate(width: number, height: number, algorithm: GeneratorAlgorithm): Maze  {
    return this.mazeFactory
      .setWidth(width)
      .setHeight(height)
      .setAlgorithm(algorithm)
      .make();
  }


  public solve(maze: Maze, start: Point, finish: Point, algorithm: SolverAlgorithms): MazeSolution | null {
    const solver = <Solver> this.solverFactory(algorithm);
    return solver.solve(maze, start, finish);
  }
}

export default Client;