import LinkedList from "../Utils/LinkedList";
import Maze from "../Models/Maze";

interface Generator {
  /**
   * Generate a maze with the given dimensions
   * 
   * @param {number} width 
   * @param {number} height
   * 
   * @return {Maze} 
   */
  generate(width: number, height: number): Maze;
}

export default Generator;