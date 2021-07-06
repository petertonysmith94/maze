import Point from './Point';
import Node from './Node';
import Entity from './Entity';

interface INode {
  /**
   * @member {Point} coordinate
   * @public
   * @readonly
   */
  readonly coordinate: Point;

  /**
  * @member {INode | Entity} north
  * @public
  */
  north: INode | Entity;

  /**
  * @member {INode | Entity} north
  * @public
  */
  east: INode | Entity;
  
  /**
  * @member {INode | Entity} north
  * @public
  */
  south: INode | Entity;
  
  /**
  * @member {INode | Entity} north
  * @public
  */
  west: INode | Entity;
}

export default INode;