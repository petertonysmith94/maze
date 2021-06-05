import { inject, injectable } from "inversify";
import { LinkedList } from "..";
import { cloneDeep as deepClone } from 'lodash';
import Types from "../Container/Types";
import Grid from "../Models/Grid";
import Maze from "../Models/Maze";
import AddEntranceOptions from './Options/AddEntranceOptions';
import InitialiseOptions from './Options/InitialiseOptions';
import AddWallOptions from './Options/AddWallOptions';
import Engine from "./Engine";
import Pipeline from "./Pipeline";
import InitialiseOperation from "./Operations/InitialiseOperation";
import AddWallOperation from "./Operations/AddWallOperation";
import AddEntranceOperation from "./Operations/AddEntranceOperation";

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
  public build(): Maze {
    return this.pipeline.build();
  }
}

export default HistoryEngine;