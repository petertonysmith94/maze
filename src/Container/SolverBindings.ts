import { interfaces } from 'inversify';
import Types from './Types';
import Solver from '../Solver/Solver';
import SolverAlgorithms from '../Solver/SolverAlgorithms';
import AStarSolver from '../Solver/AStar/AStarSolver';

import Bind = interfaces.Bind;

export default (bind: Bind) => {

  bind<interfaces.Factory<Solver>>(Types.SolverFactory)
    .toFactory((context: interfaces.Context) => {
      return (algorithm: SolverAlgorithms) => {
        if (!context.container.isBoundNamed(Types.Solver, algorithm)) {
          throw new Error(`The solver ${algorithm} has not been implemented/bound.`);
        }
        return context.container.getNamed<Solver>(Types.Solver, algorithm);
      };
    });

  bind<Solver>(Types.Solver)
    .to(AStarSolver)
    .whenTargetNamed(SolverAlgorithms.A_STAR);
  
};