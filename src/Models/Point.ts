class Point {
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
}

export default Point;