import { injectable } from 'inversify';
import InvalidArgumentException from '../../Exceptions/InvalidArgumentException';
import Grid from "../../Models/Grid";
import Node from '../../Models/Node';
import Point from '../../Models/Point';
import Entity from '../../Models/Entity';
import InitialiseOptions from '../Options/InitialiseOptions';
import Operation from './Operation';
import OperationType from './OperationType';
import PipelineOperation from '../PipelineOperation';

@injectable()
class InitialiseOperation implements Operation {
  /**
   * Obtains the pipeline operation
   * 
   * @param {InitialiseOptions} options 
   * @returns {PipelineOperation}
   */
  public static operation(options: InitialiseOptions): PipelineOperation {
    return {
      type: OperationType.INITIALISE,
      options
    };
  }
  
  public invoke(grid: Grid, options: InitialiseOptions): Grid {
    this.validateOptions(options);
    return this.buildGrid(options);
  }

  /**
   * Validates the options that have been passed in
   * 
   * @param {InitialiseOptions} options
   * 
   * @throws {InvalidArgumentException}
   */
  private validateOptions(options: InitialiseOptions) {
    if (options.width < 1) {
      throw new InvalidArgumentException('The width can\'t be less than 1');
    }

    if (options.height < 1) {
      throw new InvalidArgumentException('The height can\'t be less than 1');
    }
  }

  /**
   * Builds the multi dimensional grid
   * 
   * @param {InitialiseOptions} options
   * 
   * @returns {Array<Array<Node>>}
   */
  private buildGrid(options: InitialiseOptions): Grid {
    const { width, height, innerWalled } = options;

    let grid = Grid.instance(width, height);

    console.log(this);

    if (!innerWalled) {
      grid = this.emptyInnerGrid(width, height, grid);
    }

    return grid;
  }

  private emptyInnerGrid(width: number, height: number, grid: Grid): Grid {
    let nx, ny;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        // North
        nx = x;
        ny = y - 1;
        if (this.withinInnerBounds(nx, ny, width, height)) {
          grid[x][y].north = grid[nx][ny];
          grid[nx][ny].south = grid[x][y];
        }

        // West
        nx = x - 1;
        ny = y;
        if (this.withinInnerBounds(nx, ny, width, height)) {
          grid[x][y].west = grid[nx][ny];
          grid[nx][ny].east = grid[x][y];
        }
      }
    }
    return grid;
  }

  private withinInnerBounds(x: number, y: number, width: number, height: number): boolean {
    return x < (width) && x >= 0 && y < (height) && y >= 0;
  }
}

export default InitialiseOperation;