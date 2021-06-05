import { injectable } from 'inversify';
import Entity from '../../Models/Entity';
import Grid from '../../Models/Grid';
import AddWallOptions from '../Options/AddWallOptions';
import Operation from './Operation';
import OperationType from './OperationType';
import PipelineOperation from '../PipelineOperation';

@injectable()
class AddWallOperation implements Operation {
  /**
   * Obtains the pipeline operation
   * 
   * @param {AddEntranceOptions} options 
   * @returns {PipelineOperation}
   */
  public static operation(options: AddWallOptions): PipelineOperation {
    return {
      type: OperationType.ADD_WALL,
      options
    };
  }

  /**
   * Adds a wall to the grid
   * 
   * @param {Grid} grid 
   * @param {AddWallOptions} options 
   * @returns {Grid}
   */
  public invoke(grid: Grid, options: AddWallOptions): Grid {
    const { x, y, width, height, isHorizontal } = options;

    let i = isHorizontal ? x : y;
    const end = isHorizontal ? width + x : height + y;
    for (; i < end; i++) {
      if (isHorizontal) {
        grid[i][y].south = Entity.WALL;
        grid[i][y + 1].north = Entity.WALL;
      } else {
        grid[x][i].east = Entity.WALL;
        grid[x + 1][i].west = Entity.WALL;
      }
    }

    return grid;
  }
}

export default AddWallOperation;