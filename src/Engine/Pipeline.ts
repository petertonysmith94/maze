import { inject, injectable, interfaces } from 'inversify';
import { cloneDeep } from 'lodash';
import Grid from '../Models/Grid';
import Operation from './Operations/Operation';
import PipelineOperation from './PipelineOperation';
import LinkedList from '../Utils/LinkedList';
import OperationType from './Operations/OperationType';
import InvalidOperationException from '../Exceptions/InvalidOperationException';
import Types from '../Container/Types';
import Maze from '../Models/Maze';

@injectable()
class Pipeline
{
  /**
   * @member {interfaces.Factory<Operation>}
   * @private
   * @readonly
   */
   private readonly operationsFactory;

  /**
   * @member {Map<OperationType, Operation>}
   * @private
   * @readonly
   */
  private readonly cache: Map<OperationType, Operation> = new Map();

  /**
   * @member {LinkedList<PipelineOperation>}
   * @private
   */
  public operations: LinkedList<PipelineOperation> = new LinkedList<PipelineOperation>();

  /**
   * @member {LinkedList<Grid>}
   * @private
   */
  public timeline: LinkedList<Grid> = new LinkedList<Grid>();

  /**
   * @member {Grid | undefined}
   * @private
   */
  public pointer: Grid | undefined;

  /**
   * @param {interfaces.Factory<Operation>} operationsFactory 
   */
  public constructor(
    @inject(Types.OperationFactory) operationsFactory: interfaces.Factory<Operation>
  ) {
    this.operationsFactory = operationsFactory;
  }

  /**
   * Initialises the pipeline for processing.
   * 
   * @param {PipelineOperation} operation
   */
  public initialise(operation: PipelineOperation): void {
    this.operations = new LinkedList<PipelineOperation>();
    this.timeline = new LinkedList<Grid>();
    this.pointer = Grid.instance(1, 1);

    this.add(operation);
  }

  /**
   * Adds the operation, and runs it against the previous grid.
   * 
   * @param {Operation} operation
   */
  public add(operation: PipelineOperation): void {
    if (this.pointer === undefined) {
      throw new InvalidOperationException(
        'You must first initialise the pipeline.'
      )
    }

    const op: Operation = this.find(operation);

    this.pointer = op.invoke(this.pointer, operation.options);
    this.operations.insertAtEnd(operation);
    this.timeline.insertAtEnd(cloneDeep(this.pointer));
  }

  /**
   * Finds an operation, either from cache or creates a new instance.
   * 
   * @param {PipelineOperation} operation 
   * @returns {Operation}
   */
  private find(operation: PipelineOperation): Operation {
    let op: Operation | undefined = this.cache.get(operation.type);

    if (op === undefined) {
      op = <Operation> this.operationsFactory(operation.type);
      this.cache.set(operation.type, op);
    }
    return op;
  }

  /**
   * Build a maze
   * 
   * @returns {Maze}
   */
   public build(): Maze {
    if (this.pointer === undefined) {
      throw new Error('The grid has not yet been initialised');
    }

    return new Maze(
      this.pointer,
      this.timeline,
      this.operations
    );
  }
}

export default Pipeline;