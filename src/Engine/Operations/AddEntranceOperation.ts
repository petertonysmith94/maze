import { injectable } from 'inversify';
import Grid from '../../Models/Grid';
import AddEntranceOptions from '../Options/AddEntranceOptions';
import PipelineOperation from '../PipelineOperation';
import Operation from './Operation';
import OperationType from './OperationType';

@injectable()
class AddEntranceOperation implements Operation {
  /**
   * Obtains the pipeline operation
   * 
   * @param {AddEntranceOptions} options 
   * @returns {PipelineOperation}
   */
  public static operation(options: AddEntranceOptions): PipelineOperation {
    return {
      type: OperationType.ADD_ENTRANCE,
      options
    };
  }

  /**
   * Adds an entrance to the grid
   * 
   * @param {Grid} grid 
   * @param {AddEntranceOptions} options 
   * @returns {Grid}
   */
  public invoke(grid: Grid,options: AddEntranceOptions): Grid {
    const { x, y, isHorizontal } = options;

    if (isHorizontal) {
      grid[x][y].south = grid[x][y + 1];
      grid[x][y + 1].north = grid[x][y];
    } else {
      grid[x][y].east = grid[x + 1][y];
      grid[x + 1][y].west = grid[x][y];
    }
    return grid;
  }
}

export default AddEntranceOperation;