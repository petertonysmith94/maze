import Coordinate from "../../Models/Coordinate";
import Grid from "../../Models/Grid";
import INode from "../../Models/INode";
import Node from "../../Models/Node";
import Neighbours, { Direction, getOpposite } from "../../Models/NodeNeighbours";
import Transformer from "./Transformer";

type CoordinateTranslationFunction = (coordinate: Coordinate) => Coordinate;

type DirectionMap = { [direction in Direction]: CoordinateTranslationFunction }

const Map: DirectionMap = {
  'north': (c: Coordinate) => {
    return { x: c.x, y: c.y - 1 }
  },
  'east': (c: Coordinate) => {
    return { x: c.x + 1, y: c.y }
  },
  'south': (c: Coordinate) => {
    return { x: c.x, y: c.y + 1 }
  },
  'west': (c: Coordinate) => {
    return { x: c.x - 1, y: c.y }
  },
};

abstract class NodeTransformer implements Transformer {
  /**
   * Primary method of transforming a grid of nodes
   * 
   * @param {Grid} grid 
   * @returns {Grid}
   */
  public transform(grid: Grid): Grid {
    console.log('transforming');

    const width = grid.length;
    const height = grid[0].length;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        grid[x][y] = this.generate(grid[x][y]);
      }
    }

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {

        for (let direction of Neighbours) {
          const nc = Map[direction]({ x, y });

          if (!this.inBounds(nc, width, height)) {
            continue;
          }

          if (grid[x][y][direction] instanceof Node && grid[nc.x][nc.y]) {
            grid[x][y][direction] = grid[nc.x][nc.y]
            grid[nc.x][nc.y][getOpposite(direction)] = grid[x][y];
          }
        }
      }
    }
    return grid;
  }

  // private getNeighbour(
  //   grid: Grid,
  //   width: number,
  //   height: number,
  //   x: number,
  //   y: number,
  //   direction: Direction
  // ): Node | null {
  //   const neighbourCoordinates = Map[direction]({ x, y });

  //   if (!this.inBounds(neighbourCoordinates, width, height)) {
  //     return null;
  //   }

  //   return grid[neighbourCoordinates.x][neighbourCoordinates.y];
  // }

  public inBounds(coordinate: Coordinate, width: number, height: number): boolean {
    return coordinate.x >= 0 && coordinate.x < width && coordinate.y >= 0 && coordinate.y < height;
  }

  /**
   * Given the old instance, generate a new one
   * 
   * @param {Node} node 
   * @returns {Node}
   */
  abstract generate(node: INode): INode;
}

export default NodeTransformer;