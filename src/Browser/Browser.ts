import Grid from '../Models/Grid';
import Maze from '../Models/Maze';
import { Node } from '../Utils/LinkedList';

class Browser {
  /**
   * @member {Maze} maze
   * @private
   */
  private instance: Maze;

  /**
   * @member {Grid | null} current
   * @private
   */
  private current: Node<Grid> | null;

  /**
   * @param {Maze} maze 
   */
  public constructor(maze: Maze) {
    this.instance = maze;
    this.current = maze.history.head;
    this.last();
  }

  /**
   * Obtain the maze
   * 
   * @returns {Maze}
   */
  public get maze(): Maze {
    return this.instance;
  }

  /**
   * Obtain the current grid
   * 
   * @returns {Grid | null}
   */
  public get grid(): Grid | null {
    return this.current?.data || null;
  }

  /**
   * Sets to the first iteration of the grid
   */
  first(): void {
    if (this.current) {
      while(this.current.previous) {
        this.current = this.current?.previous;
      }
    }
  }

  /**
   * Sets to the previous iteration of the grid
   */
  previous(): void {
    if (this.current && this.current.previous) {
      this.current = this.current.previous;
    }
  }

  /**
   * Sets to the next iteration of the grid
   */
  next(): void {
    if (this.current && this.current.next) {
      this.current = this.current.next;
    }
  }

  /**
   * Sets to the last iteration of the grid
   */
  last(): void {
    if (this.current) {
      while(this.current.next) {
        this.current = this.current?.next;
      }
    }
  }
}

export default Browser;