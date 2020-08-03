import React from "react";
import "./card.scss";

const createMarkup = setHtml => ({ __html: setHtml });

const setHtml = setHtml => (
  <div dangerouslySetInnerHTML={createMarkup(setHtml)} />
);

const Card = ({ title, description, descriptionHtml, img, children }) => {
  const list = null;
  return (
    <div className="card shadow  bg-white rounded">
      {img ? (
        <img
          className="card-img-top"
          alt="img de actividad"
          src={`https://app.fonselp.com/storage/${img}`}
        />
      ) : (
        <div className="card-header">{title}</div>
      )}
      <div className="card-block">
        <div className="card-body">
          {img ? <h5 className="card-title mt-3">{title}</h5> : null}
          <div>{description || setHtml(descriptionHtml)}</div>
        </div>
      </div>
      {children && <div className="card-footer">{children}</div>}
    </div>
  );
};
Card.propTypes = {};

export default Card;
