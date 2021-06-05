import Entity from "./Entity";
import Point from "./Point";

class Node {
  /**
   * @member {Entity} DEFAULT_VALUE
   * @private
   * @static
   * @readonly
   */
  private static readonly DEFAULT_VALUE = Entity.WALL;

  /**
   * @member {Point} coordinate
   * @private
   * @readonly
   */
  public readonly coordinate: Point;

  /**
   * @member {Node | Entity} north
   * @public
   */
  public north: Node | Entity;

  /**
   * @member {Node | Entity} north
   * @public
   */
  public east: Node | Entity;
  
  /**
   * @member {Node | Entity} north
   * @public
   */
  public south: Node | Entity;
  
  /**
   * @member {Node | Entity} north
   * @public
   */
  public west: Node | Entity;

  /**
   * @param {Point} coordinate 
   * @param {Entity} defaultValue 
   */
  public constructor (coordinate: Point, defaultValue: Entity = Node.DEFAULT_VALUE) {
    this.coordinate = coordinate;
    this.north = defaultValue;
    this.east = defaultValue;
    this.south = defaultValue;
    this.west = defaultValue;
  }
}

export default Node;