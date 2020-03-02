import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { actions as modalAction } from '../../../store/ducks/modal.duck';
import { actions as modalActivities } from '../../../store/ducks/activities.duck';
import { actions as userActivitiesAction } from '../../../store/ducks/user/activities.duck';
import './card.scss';

const Card = ({
 activity_id, user_id, title, description, img, isApply,
}) => {
  const dispatch = useDispatch();

  const sendApplyInfo = (postulation_reason) => {
    const payload = {
      postulation_reason,
      user_id,
      activity_id,
    };
    dispatch(modalActivities.applyActivity({ payload }));
  };

  const openApplyModal = useCallback(() => {
    dispatch(
      modalAction.modalShow({
        modalProps: {
          open: true,
          title,
          message: description,
          send: (postulation_reason) => sendApplyInfo(postulation_reason),
        },
        modalType: 'apply',
      }),
    );
    dispatch(userActivitiesAction.getActivities(user_id));
  });

  const openUnapplyModal = useCallback(() => {
    dispatch(
      modalAction.modalShow({
        modalProps: {
          open: true,
          title,
          message: description,
          send: () => dispatch(
              modalActivities.unapplyActivity({
                payload: {
                  user_id,
                  activity_id,
                },
              }),
            ),
        },
        modalType: 'unapply',
      }),
    );
    dispatch(userActivitiesAction.getActivities(user_id));
  });
  // src={`https://app.fonselp.com/storage/${img}`}
  return (
    <div className="col-12  col-md-6 col-lg-4">
      <div className="card mb-4 box-shadow">
        <div className="card__head">
          <img className="card-img-top" alt="" />
          <span className="card__head__title">{title}</span>
        </div>
        <div className="card-body">
          <p className="card-text">{description}</p>
        </div>
        <div className="card__body__info">Estado de la actividad: Abierto</div>
      </div>
      <div className="card__foot">
        {isApply ? (
          <button
            className="btn btn-primary"
            onClick={openApplyModal}
            type="button"
          >
            Postularme
          </button>
        ) : (
          <button
            className="btn btn-danger"
            onClick={openUnapplyModal}
            type="button"
          >
            Despostularme
          </button>
        )}
        <button className="btn btn-secondary" type="button">
          Ver más
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {};

export default Card;
