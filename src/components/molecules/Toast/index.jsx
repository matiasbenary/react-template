import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Toast.scss';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../store/ducks/toast.duck';
import Item from './Item';

const Toast = () => {
  const { list } = useSelector((state) => state.toast);
  const dispatch = useDispatch();
  const deleteToast = (id) => {
    dispatch(actions.deleteToast({ id }));
  };

  /*  useEffect(() => {
    setList([...toastList]);
  }, [toastList]);
  /* settime
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length && list.length) {
        deleteToast(toastList[0].id);
      }
    }, dismissTime);

    return () => {
      clearInterval(interval);
    };
  }, [toastList, autoDelete, dismissTime, list]);
  */

  return (
    <>
      <div className="notification-container top-right">
        {list.map((toast) => (
          <Item toast={toast} key={`toast-${toast.id}`} deleteToast={deleteToast} />
        ))}
      </div>
    </>
  );
};

Toast.propTypes = {
  toastList: PropTypes.array.isRequired,
  position: PropTypes.string,
  autoDelete: PropTypes.bool,
  dismissTime: PropTypes.number,
};

export default Toast;
