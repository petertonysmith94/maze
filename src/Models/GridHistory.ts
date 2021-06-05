import LinkedList from '../Utils/LinkedList';
import Grid from '../Models/Grid';

class GridHistory extends LinkedList<Grid> {

  public constructor () {
    super();
  }

  public export(): string {
    return '';
  }
}

export default GridHistory;