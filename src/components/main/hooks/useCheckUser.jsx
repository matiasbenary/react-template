import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { actions } from '../../../store/ducks/toast.duck';

const checkCorrect = (obj) => Object.values(obj).reduce((acc, voluntee) => {
  acc = voluntee ? acc + 1 : acc;
  return acc;
}, 0);

const useCheckUser = (user) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (checkCorrect(user.volunteeringFields) <= 9) {
      dispatch(actions.addToast({
        item: {
          id: 'UserIncomplete',
          description: <p>
            Falta completar datos personales
            {' '}
            <Link to="/profile">click aqui</Link>
                       </p>,
          type: 'warning',
        },
      }));
    }
  }, []);
};

export default useCheckUser;
