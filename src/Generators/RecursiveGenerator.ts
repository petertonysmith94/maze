import { inject, injectable } from 'inversify';
import Maze from '../Models/Maze';
import Generator from './Generator';
import Types from '../Container/Types';
import Engine from '../Engine/Engine';

@injectable()
class RecursiveGenerator implements Generator {
  /**
   * @member {Engine} engine
   * @private
   */
  private engine: Engine;

  /**
   * @param {Engine} engine 
   */
  public constructor (@inject(Types.Engine) engine: Engine) {
    this.engine = engine;
  }

  /**
   * @inheritdoc
   */
  public generate(width: number, height: number): Maze {
    this.engine.initialise({ width, height, innerWalled: false });

    const isHorizontal = this.chooseOrientation(width, height);
    this.divide(0, 0, width, height, isHorizontal);

    return this.engine.build();
  }

  /**
   * Determines whether we're orientating on the horizontal
   * 
   * @param {number} width 
   * @param {number} height
   * @returns {boolean}
   */
  private chooseOrientation(width: number, height: number): boolean {
    if (width < height) return true;
    else if (height < width) return false;
    else return Math.random() <= 0.5;
  }

  /**
   * Generate random number between two values
   * 
   * @param {number} max 
   * @param {number} min 
   * @returns {number}
   */
  private randomNumber(max: number, min = 0): number {
    const random = Math.random() * (max - min);
    return min + Math.floor(random);
  }

  /**
   * Perform the recursive algorithm on the grid provided
   * 
   * @param {number} x 
   * @param {number} y 
   * @param {number} width 
   * @param {number} height 
   * @param {boolean} isHorizontal 
   */
  private divide(
    x: number,
    y: number,
    width: number,
    height: number,
    isHorizontal: boolean
  ): void {
    if (width < 2 || height < 2) {
      return;
    }

    // Adds a wall
    let wx = x + (isHorizontal ? 0 : this.randomNumber(width - 1));
    let wy = y + (isHorizontal ? this.randomNumber(height - 1) : 0);
    this.engine.addWall({ x: wx, y: wy, width, height, isHorizontal })

    // Adds an route though the wall
    const px = wx + (isHorizontal ? this.randomNumber(width, 0) : 0);
    const py = wy + (isHorizontal ? 0 : this.randomNumber(height, 0));
    this.engine.addEntrance({ x: px, y: py, isHorizontal });

    let nx, ny, w, h;
    nx = x;
    ny = y;
    w = isHorizontal ? width : (wx - x + 1);
    h = isHorizontal ? (wy - y + 1) : height;
    this.divide(nx, ny, w, h, this.chooseOrientation(w, h));

    nx = isHorizontal ? x : (wx + 1);
    ny = isHorizontal ? (wy + 1) : y;
    w = isHorizontal ? width : (x + width - wx - 1);
    h = isHorizontal ? (y + height - wy - 1) : height;
    this.divide(nx, ny, w, h, this.chooseOrientation(w, h));
  }
}

export default RecursiveGenerator;