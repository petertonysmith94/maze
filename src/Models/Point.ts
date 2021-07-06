import Coordinate from './Coordinate';

class Point implements Coordinate {
  /**
   * @member {number} x
   * @private
   */
  private readonly xCoordinate: number;

  /**
  * @member {number} y
  * @private
  */
  private readonly yCoordinate: number;

  /**
   * @param {number} x 
   * @param {number} y 
   */
  public constructor (x: number, y: number) {
    this.xCoordinate = x;
    this.yCoordinate = y;
  }

  /**
   * @returns {number}
   */
  public get x(): number {
    return this.xCoordinate;
  }

  /**
   * @returns {number}
   */
  public get y(): number {
    return this.yCoordinate;
  }

  public inBounds(x: number, y: number, width: number, height: number): boolean {
    return x >= 0 && x < width && y >= 0 && y < height;
  }

  /**
   * Checks the point is within bounds
   * 
   * @param {number} width 
   * @param {number} height 
   * @returns {boolean}
   */
  public withBounds(width: number, height: number): boolean {
    return this.x >= 0 && this.x < width && this.y >= 0 && this.y < height;
  }
}

export default Point;