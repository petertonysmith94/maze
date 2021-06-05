import Grid from '../Models/Grid';
import Maze from '../Models/Maze';
import LinkedList, { Node } from '../Utils/LinkedList';

class Browser {

  private maze: Maze;

  private current: Node<Grid> | null;

  public constructor(maze: Maze) {
    this.maze = maze;
    this.current = maze.history.head;
  }


  public get grid(): Grid | null {
    return this.current?.data || null;
  }

  /**
   * Revert back to the first iteration of the maze
   */
  first(): void {
    if (this.current) {
      while(this.current.previous) {
        this.current = this.current?.previous;
      }
    }
  }

  /**
   * 
   */
  previous(): void {
    if (this.current && this.current.previous) {
      this.current = this.current.previous;
    }
  }

  /**
   * 
   */
  next(): void {
    if (this.current && this.current.next) {
      this.current = this.current.next;
    }
  }

  /**
   * 
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