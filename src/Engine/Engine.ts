import AddEntranceOptions from './Options/AddEntranceOptions';
import InitialiseOptions from './Options/InitialiseOptions';
import AddWallOptions from './Options/AddWallOptions';
import TransformationOptions from './Options/TransformationOptions';
import Maze from '../Models/Maze';

interface Engine {
  /**
   * Initialise a new grid for the engine
   * 
   * @param {GridOptions} options
   * 
   * @return {Engine} 
   */
  initialise(options: InitialiseOptions): Engine;

  /**
   * Loads a maze into the engine
   * 
   * @param {Maze} maze
   * 
   * @return {Engine}
   */
  load(maze: Maze): Engine;

  /**
   * Adds a wall to the maze
   * 
   * @param {AddWallOptions} options
   * 
   * @return {Engine} 
   */
  addWall(options: AddWallOptions): Engine;

  /**
   * Adds a passage through a wall
   * 
   * @param {AddEntranceOptions} options
   * 
   * @return {Engine} 
   */
  addEntrance(options: AddEntranceOptions): Engine;

  /**
   * Transforms a grid into another form of grid
   * 
   * @param {TransformationOptions} options
   * 
   * @returns {Engine} 
   */
  transfom(options: TransformationOptions): Engine;

  /**
   * Builds the maze
   * 
   * @returns {Maze}
   */
  build(): Maze;
}

export default Engine;