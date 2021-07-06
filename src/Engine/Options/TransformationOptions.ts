import Options from './Options';
import Transformer from '../Transformers/Transformer';

interface TransformationOptions extends Options {
  transformer: Transformer;
}

export default TransformationOptions;