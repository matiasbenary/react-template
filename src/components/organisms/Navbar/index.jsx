import React, { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import config from "../../../config";
import { actions } from "../../../store/ducks/auth.duck";

const Img = styled.img`
  width: ${props => props.width || "200px"};
`;

const Navbar = ({ email }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(actions.logOut());
  };

  const toogleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white ">
      <div className="container">
        <ul className="nav navbar-nav flex-row justify-content-between">
          <li className="px-3">
            <Link to="/">Inicio</Link>
          </li>
          <li className="px-3">
            <Link to="/actividad">Mis actividades</Link>
          </li>
          <li className="px-3">
            <Link to="/horas">Mis horas</Link>
          </li>
        </ul>
        <Link to="/" className="navbar-brand">
          <Img
            src={config.logo}
            width={config.logo_width}
            className="d-inline-block align-top"
            alt=""
          />
        </Link>
        {/* <button
        className="navbar-toggler"
        type="button"
      >
        <span className="navbar-toggler-icon" />
      </button> */}

        <ul className="nav navbar-nav flex-row justify-content-between">
          <li className="nav-item order-2 order-md-1">
            <div>
              <div classname="nav-link" title="settings">
                <i classname="fa fa-cog fa-fw fa-lg"></i>
              </div>
              <i classname="fa fa-cog fa-fw fa-lg"></i>
            </div>
          </li>
          <li className="dropdown order-1">
            <button
              type="button"
              id="dropdownMenu1"
              data-toggle="dropdown"
              className="btn btn-link dropdown-toggle"
              onClick={toogleMenu}
            >
              {email}
              <span className="caret" />
            </button>
            <ul
              className={`dropdown-menu dropdown-menu-right mt-2 ${
                isOpen ? "show" : null
              }`}
            >
              <li className="px-5 ">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={logout}
                >
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

/*    { <nav className="navbar">
      <div className="navbar__menu">
        <div className="navbar__brand">
          <Link to="/">
            <img src={Logo} alt="" className="navbar__brand__logo" />
          </Link>
          <span className="navbar__brand__text" />
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
    */
