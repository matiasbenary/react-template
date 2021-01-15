import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import Home from '../pages/Private/Home';
import Activities from '../pages/Private/Activities';
import Hours from '../pages/Private/Hours';
import ModalRoot from '../molecules/Modal/ModalRoot';
import DetailActivity from '../pages/Private/DetailActivity';
import Profile from '../pages/Private/Profile';
import './layout.scss';
import Toast from '../molecules/Toast';
import Management from '../pages/Private/Management';
import { actions } from '../../store/ducks/toast.duck';

const checkCorrect = (obj) => Object.values(obj).reduce((acc, voluntee) => {
  acc = voluntee ? acc + 1 : acc;
  return acc;
}, 0);

const Main = () => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if (checkCorrect(user.volunteeringFields) <= 7) {
      dispatch(actions.addToast({
        item: {
          id: 'test12321',
          description: <p>
            Falta completar datos personales ,
            <Link to="/profile">click aqui</Link>
                       </p>,
          type: 'success',
        },
      }));
    }
  }, []);

  return (
    <div className="bg-light" style={{ minHeight: '100vh' }}>
      <Navbar email={user.email} name={user.name} />
      <Route exact path="/detail/:id" component={DetailActivity} />
      <Route exact path="/" component={Home} />
      <Route exact path="/actividad" component={Activities} />
      <Route exact path="/horas" component={Hours} />
      <Route exact path="/profile">
        <Profile user={user} />
      </Route>
      <Route exact path="/management">
        <Management user={user} />
      </Route>
      <Toast />
      <ModalRoot />
    </div>
  );
};

export default Main;
