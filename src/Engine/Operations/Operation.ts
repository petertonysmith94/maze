import Grid from "../../Models/Grid";
import Options from '../Options/Options';

interface Operation
{
  invoke(grid: Grid, options: Options): Grid;
}

export default Operation;