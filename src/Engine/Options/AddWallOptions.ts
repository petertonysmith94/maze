import Options from './Options';

interface AddWallOptions extends Options {
  x: number;
  y: number;
  width: number;
  height: number;
  isHorizontal: boolean;
}

export default AddWallOptions;