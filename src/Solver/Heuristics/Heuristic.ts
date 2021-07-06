import Point from "../../Models/Point";

interface Heuristic {
  calculate(a: Point, b: Point): number;
}

export default Heuristic;