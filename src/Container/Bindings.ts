import { interfaces } from 'inversify';
import GridFactory from '../Factory/GridFactory';
import MazeFactory from '../Factory/MazeFactory';
import Types from './Types';

import Bind = interfaces.Bind;

export default (bind: Bind) => {
  bind<GridFactory>(Types.GridFactory).to(GridFactory);
  bind<MazeFactory>(Types.MazeFactory).to(MazeFactory);
};