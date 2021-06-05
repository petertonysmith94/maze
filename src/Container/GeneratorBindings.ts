import { interfaces } from 'inversify';
import Types from './Types';
import MazeFactory from '../Generators/MazeFactory';
import Generator from '../Generators/Generator';
import GeneratorNotFound from '../Exceptions/GeneratorNotFound';
import GeneratorAlgorithm from '../Generators/GeneratorAlgorithm';
import RecursiveGenerator from '../Generators/RecursiveGenerator';
import PrimsGenerator from '../Generators/PrimsGenerator';
import Bind = interfaces.Bind;

export default (bind: Bind) => {
  bind<MazeFactory>(Types.MazeFactory).to(MazeFactory);

  bind<interfaces.Factory<Generator>>(Types.GeneratorFactory)
    .toFactory((context: interfaces.Context) => {
      return (algorithm: GeneratorAlgorithm) => {
        if (!context.container.isBoundNamed(Types.Generator, algorithm)) {
          throw new GeneratorNotFound(`The generator ${algorithm} has not been implemented/bound.`);
        }
        return context.container.getNamed<Generator>(Types.Generator, algorithm);
      };
    });

  bind<Generator>(Types.Generator)
    .to(RecursiveGenerator)
    .whenTargetNamed(GeneratorAlgorithm.RECURSIVE_DIVISION);

  bind<Generator>(Types.Generator)
    .to(PrimsGenerator)
    .whenTargetNamed(GeneratorAlgorithm.PRIMS);
};