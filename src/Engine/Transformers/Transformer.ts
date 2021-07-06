import Grid from '../../Models/Grid';

interface Transformer {
  /**
   * Perform an arbitary transformation on the grid.
   * 
   * @param {Grid} grid
   * 
   * @returns {Grid}
   */
  transform(grid: Grid): Grid;
}

export default Transformer;