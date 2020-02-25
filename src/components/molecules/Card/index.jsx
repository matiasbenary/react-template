import React from 'react';
import PropTypes from 'prop-types';
import './card.scss';

const Card = ({
 id, title, description, img,
}) => (
  <div className="card col-xl-4  col-md-6 col-sm-12">
    <div className="card__head">
      <img
        className="card__head_img"
        src="https://santander.fonselp.com/storage/uploads/images/activities/2188/prueba-educacion-financiera-gral-vos-elegis-dondejpg_1571762399.jpg"
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
      <button className="btn btn-primary" type="button">
        Postularme
      </button>
      <button className="btn btn-secondary" type="button">
        Ver más
      </button>
    </div>
  </div>
);

Card.propTypes = {};

export default Card;
