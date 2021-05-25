import { injectable } from 'inversify';
import InvalidArgumentException from '../Exceptions/InvalidArgumentException';
import Entity from '../Models/Entity';
import Node from '../Models/Node';
import GridOptions from './Options/GridOptions';

@injectable()
class GridFactory {

  private static readonly DEFAULT_WIDTH = 10; 
  private static readonly DEFAULT_HEIGHT = 10; 
  private static readonly DEFAULT_GRID_OPTIONS = {
    outerWalled: true,
    outerEntrances: 1,
    outerExits: 1,
    innerWalled: false
  }; 

  /**
   * @member {number} width
   * @private
   */
  private width: number = GridFactory.DEFAULT_WIDTH;

  /**
   * @member {number} height
   * @private
   */
  private height: number = GridFactory.DEFAULT_HEIGHT;

  /**
   * @member {GridOptions} options
   * @private
   */
  private options: GridOptions = GridFactory.DEFAULT_GRID_OPTIONS;
  
  /**
   * Sets the width for the grid to be created
   * 
   * @param {number} width 
   * 
   * @returns {GridFactory}
   */
  public setWidth(width: number): GridFactory {
    this.width = width;
    return this;
  }

  /**
   * Sets the height for the grid to be created
   * 
   * @param {number} height 
   * 
   * @returns {GridFactory}
   */
  public setHeight(height: number): GridFactory {
    this.height = height;
    return this;
  }

  public setOptions(options: GridOptions): GridFactory {

    return this;
  }

  /**
   * Make the grid
   * 
   * @returns {Array<Array<Node>>}
   * @throws {InvalidArgumentException}
   */
  public make(): Array<Array<Node>> {
    if (this.width < 1) {
      throw new InvalidArgumentException('The width can\'t be less than 1');
    }

    if (this.height < 1) {
      throw new InvalidArgumentException('The height can\'t be less than 1');
    }

    const grid: Array<Array<Node>> = this.buildGrid();
    this.buildInnerStructure(grid);
    this.buildOuterStructure(grid);

    return grid;
  }

  private buildGrid(): Array<Array<Node>> {
    return Array.from({ length: this.width },
      () => Array.from({ length: this.height }, () => new Node(Entity.WALL))
    );
  }

  private buildInnerStructure(grid: Array<Array<Node>>): void {
    let nx, ny;

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        // North
        nx = x;
        ny = y - 1;
        if (this.inBounds(nx, ny)) {
          grid[x][y].north = grid[nx][ny];
          grid[nx][ny].south = grid[x][y];
        }

        // West
        nx = x - 1;
        ny = y;
        if (this.inBounds(nx, ny)) {
          grid[x][y].west = grid[nx][ny];
          grid[nx][ny].east = grid[x][y];
        }
      }
    }
  }

  private inBounds(x: number, y: number): boolean {
    return x < this.width && x >= 0 &&
      y < this.height && y >= 0;
  }

  private buildOuterStructure(grid: Array<Array<Node>>): void {
    for (let x = 0; x < this.width; x++) {
      grid[x][0].north = Entity.WALL;
      grid[x][this.width - 1].south = Entity.WALL;
    }
    
    for (let y = 0; y < this.height; y++) {
      grid[0][y].west = Entity.WALL;
      grid[this.height - 1][y].east = Entity.WALL;
    }
  }
}



export default GridFactory;