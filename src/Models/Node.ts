import Entity from "./Entity";
import Point from "./Point";

class Node {

  private static readonly DEFAULT_VALUE = Entity.WALL;

  public readonly coordinate: Point;

  public north: Node | Entity = Node.DEFAULT_VALUE;

  public east: Node | Entity = Node.DEFAULT_VALUE;
  
  public south: Node | Entity = Node.DEFAULT_VALUE;
  
  public west: Node | Entity = Node.DEFAULT_VALUE;

  public constructor (coordinate: Point, defaultValue: Entity = Node.DEFAULT_VALUE) {
    this.coordinate = coordinate;
    this.north = defaultValue;
    this.east = defaultValue;
    this.south = defaultValue;
    this.west = defaultValue;
  }
}

export default Node;