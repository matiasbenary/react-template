import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Item = ({ item, active, goTo }) => {
  return (
    <li className={`page-item ${active ? "active" : ""}`}>
      <button
        className="page-link"
        onClick={() => {
          goTo(item);
        }}
      >
        {item}
      </button>
    </li>
  );
};

const Pagination = ({ meta, action }) => {
  const dispath = useDispatch();

  const before = () => {
    dispath(action({ pages: meta.current_page - 1 }));
  };

  const next = () => {
    dispath(action({ pages: meta.current_page + 1 }));
  };

  const goTo = $page => {
    dispath(action({ pages: $page }));
  };

  const getOtherPages = () => {
    const { current_page, last_page } = meta;

    const offset = 2;

    let aux = [];

    const beforeMaxNum = last_page - offset > 0 ? last_page - offset : 1;

    const beforeIndice = current_page - offset > 1 ? current_page - offset : 1;

    const beforeAux = beforeMaxNum - offset;
    //  1 -2
    const beforeIndiceReal =
      beforeIndice >= beforeAux
        ? beforeAux > 0
          ? beforeAux
          : 1
        : beforeIndice;

    const beforeLimit = beforeIndiceReal + offset;

    const beforeLimitReal =
      beforeLimit >= beforeMaxNum ? beforeMaxNum : beforeLimit;
    const afterMinNum = beforeLimitReal + 1;

    const afterIndice =
      current_page < last_page - offset
        ? current_page + 1
        : last_page - offset + 1;

    const afterIndiceReal =
      afterIndice <= afterMinNum ? afterMinNum : afterIndice;

    const afterLimit =
      current_page + offset < last_page ? current_page + offset : last_page;

    const afterLimitReal =
      afterLimit < afterMinNum + offset
        ? afterMinNum + offset > last_page
          ? last_page + 1
          : afterMinNum + offset
        : afterLimit + 1;

    for (let indice = beforeIndiceReal; indice < beforeLimitReal; indice++) {
      aux.push(
        <Item item={indice} goTo={goTo} active={indice == current_page} />
      );
    }

    aux.push(
      <Item
        item={beforeLimitReal}
        goTo={goTo}
        active={
          beforeLimitReal < current_page < afterIndiceReal &&
          current_page == beforeLimitReal
        }
      />
    );

    for (let indice = afterIndiceReal; indice < afterLimitReal; indice++) {
      aux.push(
        <Item item={indice} goTo={goTo} active={indice == current_page} />
      );
    }

    return aux;
  };
  if (meta) {
    return (
      <div>
        {/* <div>desde:{meta.from}</div>
        <div>hasta:{meta.to}</div>
        <div>total :{meta.total}</div> */}
        <ul className="pagination pagination-sm">
          <li
            className={`page-item ${meta.current_page == 1 ? "disabled" : ""}`}
          >
            <button className="page-link" onClick={before}>
              {/* &laquo; */}
              Anterior
            </button>
          </li>
          {getOtherPages()}
          {/* <li className="page-item active">
          <button className="page-link">1</button>
        </li>
        <li className="page-item">
          <button className="page-link">2</button>
        </li>
        <li className="page-item">
          <button className="page-link">3</button>
        </li>
        <li className="page-item">
          <button className="page-link">4</button>
        </li>
        <li className="page-item">
          <button className="page-link">5</button>
        </li> */}
          <li
            className={`page-item ${
              meta.current_page == meta.last_page ? "disabled" : ""
            }`}
          >
            <button className="page-link" onClick={next}>
              {/* &raquo; */}
              Siguiente
            </button>
          </li>
        </ul>
      </div>
    );
  }

  return null;
};

export default Pagination;
