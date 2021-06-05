import OperationType from "./Operations/OperationType";
import Options from "./Options/Options";

interface PipelineOperation {
  type: OperationType;
  options: Options;
}

export default PipelineOperation;