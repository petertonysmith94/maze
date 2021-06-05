import { interfaces } from 'inversify';
import Types from './Types';
import Pipeline from '../Engine/Pipeline';
import Engine from '../Engine/Engine';
import HistoryEngine from '../Engine/HistoryEngine';
import OperationNotFound from '../Exceptions/OperationNotFound';
import Operation from '../Engine/Operations/Operation';
import OperationType from '../Engine/Operations/OperationType';
import AddEntranceOperation from '../Engine/Operations/AddEntranceOperation';
import AddWallOperation from '../Engine/Operations/AddWallOperation';
import InitialiseOperation from '../Engine/Operations/InitialiseOperation';

import Bind = interfaces.Bind;

export default (bind: Bind) => {
  bind<Engine>(Types.Engine).to(HistoryEngine);
  bind<Pipeline>(Types.Pipeline).to(Pipeline);

  bind<interfaces.Factory<Operation>>(Types.OperationFactory)
    .toFactory((context: interfaces.Context) => {
      return (operation: OperationType) => {
        if (!context.container.isBoundNamed(Types.Operation, operation)) {
          throw new OperationNotFound(`The operation ${operation} has not been implemented bound.`);
        }
        return context.container.getNamed<Operation>(Types.Operation, operation);
      };
    });

  bind<Operation>(Types.Operation)
    .to(InitialiseOperation)
    .whenTargetNamed(OperationType.INITIALISE);

  bind<Operation>(Types.Operation)
    .to(AddEntranceOperation)
    .whenTargetNamed(OperationType.ADD_ENTRANCE);

  bind<Operation>(Types.Operation)
    .to(AddWallOperation)
    .whenTargetNamed(OperationType.ADD_WALL);
};