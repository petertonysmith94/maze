import Point from "../../Models/Point";
import Heuristic from "./Heuristic";

class EuclidianDistance implements Heuristic {
  /**
   * @inheritdoc
   */
  public calculate(a: Point, b: Point): number {
    return Math.sqrt(
      Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2)
    )
  }
}

export default EuclidianDistance;