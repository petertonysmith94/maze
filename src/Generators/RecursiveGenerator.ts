import { inject, injectable } from 'inversify';
import { cloneDeep as deepClone } from 'lodash';
import LinkedList from '../Utils/LinkedList';
import Maze from '../Models/Maze';
import Node from '../Models/Node';
import Generator from './Generator';
import Types from '../Container/Types';
import GridFactory from '../Factory/GridFactory';
import Entity from '../Models/Entity';

@injectable()
class RecursiveGenerator implements Generator {

  private gridFactory: GridFactory;

  private history: LinkedList<Maze> = new LinkedList<Maze>();

  public constructor (
    @inject(Types.GridFactory) gridFactory: GridFactory
  ) {
    this.gridFactory = gridFactory;
  }

  /**
   * @inheritdoc
   */
  public generate(width: number, height: number): LinkedList<Maze> {
    const grid = this.createGrid(width, height);
    this.history = new LinkedList<Maze>();
    this.addToHistory(width, height, grid);

    const isHorizontal = this.chooseOrientation(width, height);
    this.divide(grid, 0, 0, width, height, isHorizontal);

    return this.history;
  }

  /**
   * Create the initial grid
   * 
   * @param {number} width 
   * @param {number} height 
   * @returns {Array<Array<Node>>}
   */
  private createGrid(width: number, height: number): Array<Array<Node>> {
    return this.gridFactory
      .setWidth(width)
      .setHeight(height)
      .make();
  }

  /**
   * Adds a given grid to the history
   * 
   * @param {number} width 
   * @param {number} height
   * @param {Array<Array<Node>>} grid
   */
  private addToHistory(width: number, height: number, grid: Array<Array<Node>>): void {
    this.history.insertAtEnd(
      new Maze(width, height, deepClone(grid))
    );
  }

  /**
   * Determines whether we're orientating on the horizontal
   * 
   * @param {number} width 
   * @param {number} height
   * @returns {boolean}
   */
  private chooseOrientation(width: number, height: number): boolean {
    if (width < height) return true;
    else if (height < width) return false;
    else return Math.random() <= 0.5;
  }

  /**
   * Generate random number between two values
   * 
   * @param {number} max 
   * @param {number} min 
   * @returns {number}
   */
  private randomNumber(max: number, min = 0): number {
    const random = Math.random() * (max - min);
    return min + Math.floor(random);
  }

  /**
   * Perform the recursive algorithm on the grid provided
   * 
   * @param {Array<Array<Node>>} grid 
   * @param {number} x 
   * @param {number} y 
   * @param {number} width 
   * @param {number} height 
   * @param {boolean} isHorizontal 
   */
  private divide(
    grid: Array<Array<Node>>,
    x: number,
    y: number,
    width: number,
    height: number,
    isHorizontal: boolean,
    debug: object = {}
  ): void {
    if (width < 2 || height < 2) {
      return;
    }

    let wx = x + (isHorizontal ? 0 : this.randomNumber(width - 1));
    let wy = y + (isHorizontal ? this.randomNumber(height - 1) : 0);
    this.addWall(grid, wx, wy, width, height, isHorizontal);
    this.addToHistory(width, height, grid);

    const px = wx + (isHorizontal ? this.randomNumber(width, 0) : 0);
    const py = wy + (isHorizontal ? 0 : this.randomNumber(height, 0));
    this.removeWall(grid, px, py, isHorizontal);
    this.addToHistory(width, height, grid);

    let nx, ny, w, h;
    nx = x;
    ny = y;
    w = isHorizontal ? width : (wx - x + 1);
    h = isHorizontal ? (wy - y + 1) : height;
    this.divide(grid, nx, ny, w, h, this.chooseOrientation(w, h));

    nx = isHorizontal ? x : (wx + 1);
    ny = isHorizontal ? (wy + 1) : y;
    w = isHorizontal ? width : (x + width - wx - 1);
    h = isHorizontal ? (y + height - wy - 1) : height;
    this.divide(grid, nx, ny, w, h, this.chooseOrientation(w, h));
  }

  /**
   * Add a wall to the grid
   * 
   * @param {Array<Array<Node>>} grid 
   * @param {number} x 
   * @param {number} y 
   * @param {number} width 
   * @param {number} height 
   */
  private addWall(
    grid: Array<Array<Node>>,
    x: number,
    y: number,
    width: number,
    height: number,
    isHorizontal: boolean
  ): void {
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
  }

  /**
   * Remove a wall for the passageway through the wall
   * 
   * @param {Array<Array<Node>>} grid 
   * @param {number} x 
   * @param {number} y 
   * @param {boolean} isHorizontal 
   */
  private removeWall(
    grid: Array<Array<Node>>,
    x: number,
    y: number,
    isHorizontal: boolean
  ): void {
    if (isHorizontal) {
      grid[x][y].south = grid[x][y + 1];
      grid[x][y + 1].north = grid[x][y];
    } else {
      grid[x][y].east = grid[x + 1][y];
      grid[x + 1][y].west = grid[x][y];
    }
  }
}

export default RecursiveGenerator;