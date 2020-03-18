import React from 'react';
import './card.scss';

const createMarkup = (setHtml) => ({ __html: setHtml });

const setHtml = (setHtml) => (
  <div dangerouslySetInnerHTML={createMarkup(setHtml)} />
);

const Card = ({
 title, description, descriptionHtml, img, children, detail,
}) => {
    let list = null;
    if (detail) {
      list = detail.map((item) => (
        <p>
          {item.title}
          :
          {item.value}
        </p>
      ));
    }
  return (
  // src={`https://app.fonselp.com/storage/${img}`}   src="https://picsum.photos/200/150/?random"
  <div className="card shadow  bg-white rounded">
    {img ? (
      <img
        className="card-img-top"
        src={`https://app.fonselp.com/storage/${img}`}
      />
    ) : (
      <div className="card-header">{title}</div>
    )}
    <div className="card-block">
      <div className="card-body">
        {img ? <h5 className="card-title mt-3">{title}</h5> : null}
        <a>{description || setHtml(descriptionHtml)}</a>
        {list
          && description && <hr />}
          {list}

      </div>
      {/* <div className="card-text">
          Tawshif is a web designer living in Bangladesh.
        </div> */}
    </div>
    {children
    && (
<div className="card-footer">
      {children}
</div>
)}
  </div>
);
};
Card.propTypes = {};

export default Card;
