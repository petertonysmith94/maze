import { injectable } from 'inversify';
import LinkedList from '../Utils/LinkedList';
import Maze from '../Models/Maze';
import Generator from './Generator';

@injectable()
class PrimsGenerator implements Generator {
  public generate(width: number, height: number): Maze {
    throw new Error('Method not implemented.');
  }
}

export default PrimsGenerator;