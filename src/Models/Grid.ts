import Entity from './Entity';
import Node from './Node';
import Point from './Point';

class Grid extends Array<Array<Node>> {
  /**
   * Creates a grid instance
   * 
   * @param {number} width 
   * @param {number} height 
   * @returns {Grid}
   */
  public static instance(width: number, height: number): Grid {
    return Array.from({ length: width }, (_, x: number) => 
      Array.from({ length: height }, (_, y: number) => 
        new Node(new Point(x, y), Entity.WALL)
      )
    );
  }
}

export default Grid;