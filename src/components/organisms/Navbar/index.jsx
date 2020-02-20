import React, { useState } from 'react';
import './navbar.scss';

const Navbar = ({ email }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toogleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__menu">
        <div className="navbar__brand">
          <svg
            className="navbar__brand__logo"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <span className="navbar__brand__text">Text</span>
        </div>
        <div className="navbar__mobile_menu">
          <button
            type="button"
            className="navbar__mobile_menu__button"
            onClick={toogleMenu}
          >
            <svg
              className="navbar__mobile_menu__icon"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              {isOpen ? (
                <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
              ) : (
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              )}
            </svg>
          </button>
        </div>
      </div>
      <div className={`navbar__items ${isOpen ? 'block' : 'hidden'}`}>
        <button className="navbar__item">{email}</button>
      </div>
    </nav>
  );
};

export default Navbar;
