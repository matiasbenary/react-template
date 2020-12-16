import React from "react";
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

const Pagination = ({ meta, action, className = null ,withRedux = true }) => {
  const dispath = useDispatch();

  const setPage = (pages) => {
    if(withRedux){
      dispath(action({ pages}));
    }else{
      action(pages)
    }
  }

  const before = () => {
    setPage(meta.current_page - 1 );


  };

  const next = () => {
    setPage(meta.current_page + 1 );
  };

  const goTo = (page) => {
    setPage(page );
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
        <Item
          item={indice}
          goTo={goTo}
          active={indice === current_page}
          key={`pagination-${indice}`}
        />
      );
    }

    aux.push(
      <Item
        key={`pagination-${beforeLimitReal}`}
        item={beforeLimitReal}
        goTo={goTo}
        active={current_page === beforeLimitReal}
      />
    );

    for (let indice = afterIndiceReal; indice < afterLimitReal; indice++) {
      aux.push(
        <Item
          item={indice}
          goTo={goTo}
          active={indice === current_page}
          key={`pagination-${indice}`}
        />
      );
    }

    return aux;
  };
  if (meta) {
    return (
      <div className={className}>
        <ul className="pagination pagination-sm">
          <li
            className={`page-item ${meta.current_page === 1 ? "disabled" : ""}`}
          >
            <button className="page-link" onClick={before}>
              Anterior
            </button>
          </li>
          {getOtherPages()}
          <li
            className={`page-item ${
              meta.current_page === meta.last_page ? "disabled" : ""
            }`}
          >
            <button className="page-link" onClick={next}>
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
