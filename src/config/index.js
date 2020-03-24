import Fonselp from './226';
import Empujar from './633';
import ArgentinaLibreDeCoronavirus from './4194';


const config = () => {
  const entityConfig = process.env.REACT_APP_ID_ENTITY;

  switch (entityConfig) {
    case '226':
      return Fonselp;
    case '633':
      return Empujar;
    case '4194':
      return ArgentinaLibreDeCoronavirus;
     default:
      return Fonselp;
  }
};

export default config();
