import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './card.scss';
import Modal from '../Modal';

const Card = ({
 id, title, description, img,
}) => {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  return (
    <>
  <div className="card col-xl-4  col-md-6 col-sm-12">
    <div className="card__head">
      <img
        className="card__head_img"
        src={`https://app.fonselp.com/storage/${img}`}
        alt=""
      />
      <span className="card__head__title">{title}</span>
    </div>
    <div className="card__body">
      <div className="card__body__description">
        <span>
          {description}
        </span>
      </div>
      <div className="card__body__info">Estado de la actividad: Abierto</div>
    </div>
    <div className="card__foot">
      <button className="btn btn-primary" onClick={openModal} type="button">
        Postularme
      </button>
      <button className="btn btn-secondary" type="button">
        Ver más
      </button>
    </div>
  </div>
  <Modal title={`Postulate para ${title}`} show={open} setOpen={setOpen} />
    </>
);
};

Card.propTypes = {};

export default Card;
