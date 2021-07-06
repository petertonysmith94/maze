import { injectable } from 'inversify';
import NodeTransformer from '../../Engine/Transformers/NodeTransformer';
import Node from '../../Models/Node';
import Point from '../../Models/Point';
import AStarNode from './AStarNode';

@injectable()
class AStarTransformer extends NodeTransformer {
  /**
   * @member {Set<AStarNode>}
   * @private
   */
  private lookupTable: Array<AStarNode> = new Array<AStarNode>();

  /**
   * @param {Set<AStarNode>} unvisitedNodes 
   * @returns {AStarTransformer}
   */
  public setLookupTable(lookupTable: Array<AStarNode>): AStarTransformer {
    this.lookupTable = lookupTable;

    return this;
  }

  /**
   * @inheritdoc
   */
  public generate(node: Node): Node {
    const fresh = new AStarNode(node);
    this.lookupTable.push(fresh);
    return fresh;
  }
}

export default AStarTransformer;