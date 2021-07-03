import { inject, injectable } from 'inversify';
import Types from '../../Container/Types';
import Engine from '../../Engine/Engine';
import InvalidArgumentException from '../../Exceptions/InvalidArgumentException';
import AStarTransformer from './AStarTransformer';
import Maze from '../../Models/Maze';
import MazeSolution from '../../Models/MazeSolution';
import Point from '../../Models/Point';
import EuclidianDistance from '../Heuristics/EuclidianDistance';
import Heuristic from '../Heuristics/Heuristic';
import BaseSolver from '../BaseSolver';
import AStarNode from './AStarNode';
import Neighbour from './Neighbour';
import NodeNeighbours, { Direction, DiagonalNeighbours } from '../../Models/NodeNeighbours';
import { findIndex } from 'lodash';
import { LinkedList } from '../..';
import Node from '../../Models/Node';

@injectable()
class AStarSolver extends BaseSolver {

  private static readonly ADJACENT_COST = 10;

  private static readonly DIAGONAL_COST = 14;

  /**
   * @member {Engine} engine
   * @private
   */
  private engine: Engine;

  private heuristic: Heuristic;

  private transformer: AStarTransformer;

  private lookupTable: Array<AStarNode> = new Array<AStarNode>();

  /**
  * @param {Engine} engine 
  */
  public constructor (
    @inject(Types.Engine) engine: Engine
  ) {
    super();
    this.engine = engine;
    this.transformer = new AStarTransformer();
    this.heuristic = new EuclidianDistance();
  }

  public solve(maze: Maze, src: Point, dest: Point): MazeSolution | null {
    this.validate(maze, src, dest);
    
    // Setup the transformer and convert the current grid
    this.transformer.setLookupTable(this.lookupTable);
    this.engine.load(maze).transfom({ transformer: this.transformer });

    // Declare our open and closed nodes
    const openNodes = new Set<AStarNode>();
    const closedNodes = new Set<AStarNode>();

    // Find the finishing nod
    const finishNode = this.find(dest);

    // Find the starting node and add to open nodes
    const startNode = this.find(src);
    startNode.gScore = 0;
    startNode.fScore = startNode.gScore + this.heuristic.calculate(src, dest);
    openNodes.add(startNode);

    while (openNodes.size > 0) {
      let current = this.findNextNode(openNodes);

      if (current == null) {
        throw new Error('Unable to find next node in the open set.');
      } else if (current == finishNode) {
        return {
          generated: maze,
          start: src,
          finish: dest,
          solution: maze,
          path: this.generatePath(current).toArray()
        };
      }

      openNodes.delete(current);
      closedNodes.add(current);

      const neighbours = this.neighbours(current);
      for (const neighbour of neighbours) {
        if (!closedNodes.has(neighbour.node)) {
          neighbour.fScore = this.calculateFscore(neighbour, finishNode);
          
          if (!openNodes.has(neighbour.node)) {
            neighbour.node.overwrite(neighbour);
            openNodes.add(neighbour.node);
          } else if (neighbour.gScore < neighbour.node.gScore) {
            neighbour.node.overwrite(neighbour);
          }
        }
      }
    }
    return null;
  }

  private generatePath(node: AStarNode): LinkedList<Point> {
    const path = new LinkedList<Point>();
    let current: AStarNode | null = node;

    while(current) {
      path.insertAtEnd(current.coordinate);
      current = current.parent;
    }
    return path;
  }

  private find(point: Point): AStarNode {
    const index = findIndex(this.lookupTable, (node) =>
      node.coordinate.x === point.x && 
      node.coordinate.y === point.y
    );
    if (index === -1) {
      throw new Error('Unable to find node in table');
    }
    return this.lookupTable[index];
  }


  private findNextNode(openSet: Set<AStarNode>): AStarNode | null {
    let minimumFscore = Number.MAX_VALUE;
    let nextNode = null;

    for (const node of openSet) {
      if (node.fScore <= minimumFscore) {
        minimumFscore = node.fScore;        
        nextNode = node;
      }
    }
    return nextNode;
  }

  /**
   * Obtains a set of all the neighbours and updated g scores
   * 
   * @param {AStarNode} node
   * @returns {Set<AStarNode>}
   */
  private neighbours(node: AStarNode): Set<Neighbour> {
    const neighbours = new Set<Neighbour>();

    for (const direction of NodeNeighbours) {
      const n = node[direction];

      if (n instanceof AStarNode) {
        neighbours.add({
          node: n,
          gScore: node.gScore + this.calculateCost(direction),
          fScore: Number.MAX_VALUE,
          parent: node
        });
      }
    }
    return neighbours;
  }
  
  /**
   * Calculate the g score cost for a direction
   * 
   * @param {Direction} direction 
   * @returns {number}
   */
  private calculateCost(direction: Direction): number {
    return DiagonalNeighbours.indexOf(direction) >= 0 ? 
      AStarSolver.DIAGONAL_COST :
      AStarSolver.ADJACENT_COST;
  }


  private calculateFscore(neighbour: Neighbour, goal: AStarNode): number {
    return neighbour.gScore + this.heuristic.calculate(neighbour.node.coordinate, goal.coordinate);
  }
}

export default AStarSolver;