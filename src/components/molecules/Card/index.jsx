import React from 'react';
import './card.scss';

const createMarkup = (setHtml) => ({ __html: setHtml });

const setHtml = (setHtml) => (
  <div dangerouslySetInnerHTML={createMarkup(setHtml)} />
);

const Card = ({
 title, description, descriptionHtml, img, children,
}) => (
  // src={`https://app.fonselp.com/storage/${img}`}   src="https://picsum.photos/200/150/?random"
  <div className="card">
    {img ? (
      <img
        className="card-img-top"
        src={`https://app.fonselp.com/storage/${img}`}
      />
    ) : (
      <div className="card-header">{title}</div>
    )}
    <div className="card-block">
      {img ? <h4 className="card-title mt-3">{title}</h4> : null}

      <div className="meta">
        <a>{description || setHtml(descriptionHtml)}</a>
      </div>
      {/* <div className="card-text">
          Tawshif is a web designer living in Bangladesh.
        </div> */}
    </div>
    <div className="card-footer">
      {children}
      {/* <button className="btn btn-secondary">show</button> */}
    </div>
  </div>
);
Card.propTypes = {};

export default Card;
