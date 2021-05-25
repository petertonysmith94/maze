import Node from './Node';

class Maze {

  private width: number;

  private height: number;

  private grid: Array<Array<Node>>;

  public constructor (width: number, height: number, grid: Array<Array<Node>>) {
    this.width = width;
    this.height = height;
    this.grid = grid;
  }

  public print(): void {
    let gridString = '';

    for (let x = 0; x < this.width; x++) {
      console.group({ x });

      for (let y = 0; y < this.height; y++) {
        const el = this.grid[x][y];
        console.log({ x, y, ...el });
      }
      
      console.groupEnd();
    }

    // console.log({
    //   width: this.width,
    //   height: this.height,
    //   grid: gridString
    // });
  }
}

export default Maze;