import { inject, injectable, interfaces } from "inversify";
import Types from "../Container/Types";
import GeneratorAlgorithm from "../Generators/GeneratorAlgorithm";
import Generator from "../Generators/Generator";
import InvalidArgumentException from "../Exceptions/InvalidArgumentException";
import LinkedList from "../Utils/LinkedList";
import Maze from "../Models/Maze";
import Factory = interfaces.Factory;

@injectable()
class MazeFactory {
  /**
   * @member {Factory<Generator>} generatorFactory
   * @private
   */
  private generatorFactory: Factory<Generator>;

  /**
   * @member {number | undefined} width
   * @private
   */
  private width: number | undefined;

   /**
    * @member {number | undefined} height
    * @private
    */
  private height: number | undefined;

  /**
   * @member {GeneratorAlgorithm | undefined} algorithm
   * @private
   */
  private algorithm: GeneratorAlgorithm | undefined;

  /**
   * @param {Factory} generatorFactory 
   */
  public constructor(
    @inject(Types.GeneratorFactory) generatorFactory: Factory<Generator>
  ) {
    this.generatorFactory = generatorFactory;
  }

  /**
   * Sets the width for the grid to be created
   * 
   * @param {number} width 
   * 
   * @returns {MazeFactory}
   */
  public setWidth(width: number): MazeFactory {
    this.width = width;
    return this;
  }
  
  /**
   * Sets the height for the grid to be created
   * 
   * @param {number} height 
   * 
   * @returns {MazeFactory}
   */
  public setHeight(height: number): MazeFactory {
    this.height = height;
    return this;
  }
  
  /**
   * Set the generator algorithm for creating the maze
   * 
   * @param {GeneratorAlgorithm} generator 
   * 
   * @returns {GeneratorAlgorithm}
   */
  public setAlgorithm(algorithm: GeneratorAlgorithm): MazeFactory {
    this.algorithm = algorithm;
    return this;
  }

  /**
   * Generates a new maze
   * 
   * @returns {Maze}
   */
  public make(): Maze {
    if (undefined === this.width) {
      throw new InvalidArgumentException('The width must be specified');
    }
    if (undefined === this.height) {
      throw new InvalidArgumentException('The height must be specified');
    }
    if (undefined === this.algorithm) {
      throw new InvalidArgumentException('An algorithm must be specified');
    }

    const generator = <Generator> this.generatorFactory(this.algorithm);
    return generator.generate(this.width, this.height);
  }
}

export default MazeFactory;