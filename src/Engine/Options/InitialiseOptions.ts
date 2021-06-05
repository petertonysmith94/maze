import Options from './Options';

interface InitialiseOptions extends Options {
  width: number;
  height: number;
  innerWalled: boolean;
}

export default InitialiseOptions;