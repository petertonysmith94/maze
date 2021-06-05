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
import Entity from "../Models/Entity";
import Pipeline from "./Pipeline";
import OperationType from "./Operations/OperationType";
import InitialiseOperation from "./Operations/InitialiseOperation";
import AddWallOperation from "./Operations/AddWallOperation";
import AddEntranceOperation from "./Operations/AddEntranceOperation";
import PipelineOperation from "./PipelineOperation";
import { Node } from "../Utils/LinkedList";
import InvalidOperationException from "../Exceptions/InvalidOperationException";
import InvalidArgumentException from "../Exceptions/InvalidArgumentException";

@injectable()
class HistoryEngine implements Engine {

  private readonly pipeline: Pipeline;

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
    return this.pipeline.maze;
  }
}

export default HistoryEngine;