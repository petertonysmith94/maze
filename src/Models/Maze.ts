import { LinkedList } from '..';
import PipelineOperation from '../Engine/PipelineOperation';
import InvalidArgumentException from '../Exceptions/InvalidArgumentException';
import Grid from './Grid';
import Node from './Node';

class Maze {
  /**
   * @member {number} width
   * @private
   */
  private readonly width: number;

  /**
   * @member {number} height
   * @private
   */
  private readonly height: number;

  private readonly grid: Grid;

  public readonly history: LinkedList<Grid>;

  private readonly operations: LinkedList<PipelineOperation>;

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