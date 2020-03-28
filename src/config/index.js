import Fonselp from './226/226';
import Empujar from './633/633';
import ArgentinaLibreDeCoronavirus from './4194/4194';


const config = () => {
  const entityConfig = process.env.REACT_APP_ID_ENTITY;

  const base = Fonselp;

  switch (entityConfig) {
    case '633':
      return { ...base, ...Empujar };
    case '4194':
      return { ...base, ...ArgentinaLibreDeCoronavirus };
     default:
      return base;
  }
};

export default config();
