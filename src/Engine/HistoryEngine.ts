import { inject, injectable } from "inversify";
import Types from "../Container/Types";
import Maze from "../Models/Maze";
import AddEntranceOptions from './Options/AddEntranceOptions';
import InitialiseOptions from './Options/InitialiseOptions';
import AddWallOptions from './Options/AddWallOptions';
import Engine from "./Engine";
import Pipeline from "./Pipeline";
import InitialiseOperation from "./Operations/InitialiseOperation";
import AddWallOperation from "./Operations/AddWallOperation";
import AddEntranceOperation from "./Operations/AddEntranceOperation";
import TransformationOperation from "./Operations/TransformationOperation";
import TransformationOptions from "./Options/TransformationOptions";

@injectable()
class HistoryEngine implements Engine {
  /**
   * @member {Pipeline}
   * @private
   * @readonly
   */
  private readonly pipeline: Pipeline;

  /**
   * @param {Pipeline} pipeline
   */
  public constructor(@inject(Types.Pipeline) pipeline: Pipeline) {
    this.pipeline = pipeline;
  }

  /**
   * @inheritdoc
   */
  public initialise(options: InitialiseOptions): Engine {
    const op = InitialiseOperation.operation(options);
    this.pipeline.initialise(op);

    return this;
  }

  /**
   * @inheritdoc
   */
  public load(maze: Maze): Engine {
    this.pipeline.load(maze);

    return this;
  }

  /**
   * @inheritdoc
   */
  public addWall(options: AddWallOptions): Engine {
    const op = AddWallOperation.operation(options);
    this.pipeline.add(op);

    return this;
  }

  /**
   * @inheritdoc
   */
  public addEntrance(options: AddEntranceOptions): Engine {
    const op = AddEntranceOperation.operation(options);
    this.pipeline.add(op);

    return this;
  }

  /**
   * @inheritdoc
   */
  public transfom(options: TransformationOptions): Engine {
    const op = TransformationOperation.operation(options);
    this.pipeline.add(op);

    return this;
  }

  /**
   * @inheritdoc
   */
  public build(): Maze {
    return this.pipeline.build();
  }
}

export default HistoryEngine;