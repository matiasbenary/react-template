import Fonselp from './226/226';
import Empujar from './633/633';
import Ada from './3221/3221';
import ArgentinaLibreDeCoronavirus from './4194/4194';
import Naves from './176/176';
import VamosAZoomar from './4161/4161';


const config = () => {
  const entityConfig = process.env.REACT_APP_ID_ENTITY;

  const base = Fonselp;

  switch (entityConfig) {
    case '633':
      return { ...base, ...Empujar };
    case '4194':
      return { ...base, ...ArgentinaLibreDeCoronavirus };
    case '3221':
      return { ...base, ...Ada };
    case '176':
      return { ...base, ...Naves };
    case '4161':
    return { ...base, ...VamosAZoomar };
     default:
      return base;
  }
};

export default config();
