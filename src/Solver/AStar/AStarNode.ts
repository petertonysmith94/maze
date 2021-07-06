import INode from '../../Models/INode';
import Node from '../../Models/Node';
import Neighbour from './Neighbour';

class AStarNode extends Node {

  public gScore: number;

  public fScore: number;

  public parent: AStarNode | null;

  public visited: boolean;
  
  public constructor(
    node: Node,
    gScore: number = Number.MAX_VALUE,
    fScore: number = Number.MAX_VALUE
  ) {
    super(node.coordinate, node.north, node.east, node.south, node.west);

    this.gScore = gScore;
    this.fScore = fScore;
    this.parent = null;
    this.visited = false;
  }

  public overwrite(neighbour: Neighbour) {
    this.gScore = neighbour.gScore;
    this.fScore = neighbour.fScore;
    this.parent = neighbour.parent;
  }
}

export default AStarNode;