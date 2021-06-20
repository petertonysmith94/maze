import { injectable } from 'inversify';
import Grid from '../../Models/Grid';
import TransformationOptions from '../Options/TransformationOptions';
import PipelineOperation from '../PipelineOperation';
import Operation from './Operation';
import OperationType from './OperationType';

@injectable()
class TransformationOperation implements Operation {
  /**
   * Obtains the pipeline operation
   * 
   * @param {TransformationOptions} options 
   * @returns {PipelineOperation}
   */
  public static operation(options: TransformationOptions): PipelineOperation {
    return {
      type: OperationType.TRANSFORMATION,
      options
    };
  }

  /**
   * Transforms the grid
   * 
   * @param {Grid} grid 
   * @param {TransformationOptions} options 
   * 
   * @returns {Grid}
   */
  public invoke(grid: Grid, options: TransformationOptions): Grid {
    console.log('Transforming grid', grid);

    const transformed = options.transformer.transform(grid);

    console.log('Transformed grid', transformed);
    return transformed
  }
}

export default TransformationOperation;