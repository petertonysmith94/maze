import { injectable } from 'inversify';
import container from "./Container/Container";
import Types from "./Container/Types";
import LinkedList from "./Utils/LinkedList";
import GeneratorAlgorithm from "./Generators/GeneratorAlgorithm";
import Maze from './Models/Maze';
import MazeFactory from './Generators/MazeFactory';

@injectable()
class Client {
  /**
   * @member {MazeFactory} mazeFactory
   * @private
   */
  private mazeFactory: MazeFactory;

  public constructor() {
    this.mazeFactory = container.get<MazeFactory>(Types.MazeFactory);
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
}

export default Client;