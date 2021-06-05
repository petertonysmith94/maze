import 'reflect-metadata'
import { Container, ContainerModule } from 'inversify'
import EngineBindings from './EngineBindings';
import GeneratorBindings from './GeneratorBindings';

const engineBindings = new ContainerModule((bind) => {
  EngineBindings(bind)
});

const generatorBindings = new ContainerModule((bind) => {
  GeneratorBindings(bind)
});

const container = new Container();
container.load(engineBindings, generatorBindings);

export default container;