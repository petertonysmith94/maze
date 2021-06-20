import AStarNode from './AStarNode';

interface Neighbour {
  node: AStarNode;
  gScore: number;
  fScore: number;
  parent: AStarNode;
}

export default Neighbour;