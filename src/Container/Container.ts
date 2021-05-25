import 'reflect-metadata'
import { Container, ContainerModule } from 'inversify'
import Bindings from './Bindings';
import GeneratorBindings from './GeneratorBindings';

const bindings = new ContainerModule((bind) => {
  Bindings(bind)
});

const generatorBindings = new ContainerModule((bind) => {
  GeneratorBindings(bind)
});

const container = new Container();
container.load(bindings, generatorBindings);

export default container;