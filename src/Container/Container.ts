import 'reflect-metadata'
import { Container, ContainerModule } from 'inversify'
import EngineBindings from './EngineBindings';
import GeneratorBindings from './GeneratorBindings';
import SolverBindings from './SolverBindings';

const engineBindings = new ContainerModule((bind) => {
  EngineBindings(bind)
});

const generatorBindings = new ContainerModule((bind) => {
  GeneratorBindings(bind)
});

const solverBindings = new ContainerModule((bind) => {
  SolverBindings(bind)
});

const container = new Container();
container.load(engineBindings, generatorBindings, solverBindings);

export default container;