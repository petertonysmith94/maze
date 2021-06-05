import { inject, injectable, interfaces } from 'inversify';
import { cloneDeep } from 'lodash';
import Grid from '../Models/Grid';
import Operation from './Operations/Operation';
import PipelineOperation from './PipelineOperation';
import LinkedList from '../Utils/LinkedList';
import OperationType from './Operations/OperationType';
import InitialiseOperation from './Operations/InitialiseOperation';
import InvalidOperationException from '../Exceptions/InvalidOperationException';
import Types from '../Container/Types';
import InitialiseOptions from './Options/InitialiseOptions';
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

  public timeline: LinkedList<Grid> = new LinkedList<Grid>();

  public pointer: Grid | undefined;



  public constructor(
    @inject(Types.OperationFactory) operationsFactory: interfaces.Factory<Operation>
  ) {
    this.operationsFactory = operationsFactory;
  }

  public get maze(): Maze {
    if (this.pointer === undefined) {
      throw new Error('The grid has not yet been initialised');
    }

    return new Maze(
      this.pointer,
      this.timeline,
      this.operations
    );
  }

  public initialise(operation: PipelineOperation) {
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
   * 
   * @param operation 
   * @returns 
   */
  private find(operation: PipelineOperation): Operation {
    let op: Operation | undefined = this.cache.get(operation.type);

    if (op === undefined) {
      op = <Operation> this.operationsFactory(operation.type);
      this.cache.set(operation.type, op);
    }
    return op;
  }
}

export default Pipeline;