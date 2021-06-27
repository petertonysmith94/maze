import Entity from "./Entity";
import Point from "./Point";
import INode from './INode';

class Node implements INode {
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
  public constructor (
    coordinate: Point,
    north: Node | Entity = Node.DEFAULT_VALUE,
    east: Node | Entity = Node.DEFAULT_VALUE,
    south: Node | Entity = Node.DEFAULT_VALUE,
    west: Node | Entity = Node.DEFAULT_VALUE
  ) {
    this.coordinate = coordinate;
    this.north = north;
    this.east = east;
    this.south = south;
    this.west = west;
  }
}

export default Node;