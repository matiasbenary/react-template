import React from 'react';
import checkIcon from './assets/check.svg';
import errorIcon from './assets/error.svg';
import infoIcon from './assets/info.svg';
import warningIcon from './assets/warning.svg';

const getToast = (type) => {
  switch (type) {
    case 'success':
      return {
        title: 'Success',
        backgroundColor: '#5cb85c',
        icon: checkIcon,
      };
    case 'danger':
      return {
        title: 'Danger',
        backgroundColor: '#d9534f',
        icon: errorIcon,
      };
    case 'info':
      return {
        title: 'Info',
        backgroundColor: '#5bc0de',
        icon: infoIcon,
      };
    case 'warning':
      return {
        title: 'Warning',
        backgroundColor: '#f0ad4e',
        icon: warningIcon,
      };
    default:
      return {};
  }
};

const Item = ({ toast, deleteToast }) => {
  const typeToast = getToast(toast.type);
  return (
    <div
      className="notification toast top-right"
      style={{ backgroundColor: typeToast.backgroundColor }}
    >
      <button type="button" onClick={() => deleteToast(toast.id)}>
        X
      </button>
      <div className="notication-container-main">
        <div className="notification-image">
          <img src={typeToast.icon} style={{ height: 30, width: 30 }} alt="" />
        </div>
        <div className="notification-description">
          <p className="notification-title">{typeToast.title}</p>
          <p className="notification-message">{toast.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Item;
