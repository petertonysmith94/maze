import LinkedList from '../Utils/LinkedList';
import PipelineOperation from '../Engine/PipelineOperation';
import Grid from './Grid';

/**
 * A maze consists of the generation steps required to setup the
 * final grid and the operations required.
 */
class Maze {
  /**
   * @member {number} width
   */
  public readonly width: number;

  /**
   * @member {number} height
   */
   public readonly height: number;

  /**
   * @member {Grid} grid
   */
  public readonly grid: Grid;

  /**
   * @member {LinkedList<Grid>} history
   */
  public readonly history: LinkedList<Grid>;

  /**
   * @member {LinkedList<PipelineOperation>} history
   */
  public readonly operations: LinkedList<PipelineOperation>;

  /**
   * @param {Grid} grid 
   * @param {LinkedList<Grid>} history 
   * @param {LinkedList<PipelineOperation>} operations 
   */
  public constructor (
    grid: Grid,
    history: LinkedList<Grid>,
    operations: LinkedList<PipelineOperation>,
  ) {
    this.width = grid.length;
    this.height = grid[0].length;
    this.grid = grid;
    this.history = history;
    this.operations = operations;
  }

  /**
   * Prints out the grid.
   */
  public print(): void {
    for (let x = 0; x < this.width; x++) {
      console.group({ x });

      for (let y = 0; y < this.height; y++) {
        const el = this.grid[x][y];
        console.log({ x, y, ...el });
      }
      
      console.groupEnd();
    }
  }

  /**
   * Prints all the operation
   */
  public printOperations(): void {
    let iterator = this.operations.head;

    while (iterator) {
      console.log({
        type: iterator.data.type,
        ...iterator.data.options
      });
      iterator = iterator.next;
    }
  }
}

export default Maze;