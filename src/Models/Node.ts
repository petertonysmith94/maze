import Entity from "./Entity";

class Node {

  private static readonly DEFAULT_VALUE = Entity.WALL; 

  public north: Node | Entity = Node.DEFAULT_VALUE;

  public east: Node | Entity = Node.DEFAULT_VALUE;
  
  public south: Node | Entity = Node.DEFAULT_VALUE;
  
  public west: Node | Entity = Node.DEFAULT_VALUE;

  public constructor (defaultValue: Entity = Node.DEFAULT_VALUE) {
    this.north = defaultValue;
    this.east = defaultValue;
    this.south = defaultValue;
    this.west = defaultValue;
  }
}

export default Node;