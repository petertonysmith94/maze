class Node<T> {
  /**
   * @member {Node<T> | null} previous
   * @public
   */
  public previous: Node<T> | null = null;

  /**
   * @member {Node<T> | null} next
   * @public
   */
  public next: Node<T> | null = null;

  /**
   * @member {T} data
   * @public
   */
  public readonly data: T;

  /**
   * Construct a new linked list node
   * 
   * @param {T} data 
   */
  constructor(data: T) {
    this.data = data;
  }
}

class LinkedList<T> {
  /**
   * @member {Node<T> | null} headElement
   * @private
   */
  private headElement: Node<T> | null = null;

  /**
   * Insert an element to the end of the list
   * 
   * @param {T} data 
   * @returns {Node<T>}
   */
  public insertAtEnd(data: T): Node<T> {
    const node = new Node(data);

    if (!this.headElement) {
      this.headElement = node;
    } else {
      const tail = this.getLast(this.headElement);
      tail.next = node;
      node.previous = tail;
    }
    return node;
  }

  /**
   * Delete a given node from a list
   * 
   * @param {Node<T>} node 
   */
  public deleteNode(node: Node<T>): void {
    if (!node.previous) {
      this.headElement = node.next;
    } else {
      const previousNode = node.previous;
      previousNode.next = node.next;
      
      if (node.next) {
        node.next.previous = previousNode;
      }
    }
  }

  /**
   * Converts list to an array
   * 
   * @returns {Array<T>}
   */
  public toArray(): Array<T> {
    const result = Array<T>();
    let iterator = this.headElement;

    while (iterator) {
      result.push(iterator.data);
      iterator = iterator.next;
    }
    return result;
  }

  /**
   * Obtain the size of the list
   * 
   * @returns {number}
   */
  public size(): number {
    return this.toArray().length;
  }

  /**
   * Iterates over the list in search of the predicate
   * 
   * @param {(T => boolean)} predicate 
   * @returns {Node<T> | null}
   */
  public search(predicate: (data: T) => boolean): Node<T> | null {
    const checkNext = (node: Node<T>): Node<T> | null => {
      if (predicate(node.data)) {
        return node;
      }
      return node.next ? checkNext(node.next) : null;
    };

    return this.headElement ? checkNext(this.headElement) : null;
  }

  /**
   * Obtains the first element of the list
   * 
   * @returns {Node<T> | null}
   */
  get head (): Node<T> | null {
    return this.headElement;
  }

  /**
   * Traverses the list for the last node
   * 
   * @returns {Node<T> | null}
   */
  get tail (): Node<T> | null {
    return this.headElement ? this.getLast(this.headElement) : this.headElement;
  }

  /**
   * Obtains the last traversable node, given a starting node
   * 
   * @param {Node<T>} node 
   * @returns {Node<T>}
   */
  private getLast(node: Node<T>) : Node<T> {
    return node.next ? this.getLast(node.next) : node;
  }
}

export {
  LinkedList as default,
  Node
};