import React, { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createSelector } from 'reselect';
import { actions as modalAction } from '../../../store/ducks/modal.duck';
import { actions as modalActivities } from '../../../store/ducks/activities.duck';
import ApplyButton from '../ApplyButton';

const applyIdSelector = (state) => state.activities.applyId;
const applyMsjSelector = (state) => state.activities.apply;

const applySelector = (activity_id) => createSelector(
    applyIdSelector,
    applyMsjSelector,
    (id, msj) => activity_id == id && msj !== '',
  );

const unapplyIdSelector = (state) => state.activities.unapplyId;
const unapplyMsjSelector = (state) => state.activities.unapply;

const unapplySelector = (activity_id) => createSelector(
    unapplyIdSelector,
    unapplyMsjSelector,
    (id, msj) => activity_id == id && msj !== '',
  );

const ActivitiesButtons = memo(
  ({
 user_id, activity_id, isApply, title, description, withLink,
}) => {
    const dispatch = useDispatch();

    const [toggleButton, setToggleButton] = useState(isApply);

    // const { loading } = useSelector((state) => ({
    //   loading: state.activities.loadingApply,
    // }));

    const apply = useSelector(applySelector(activity_id));
    const unapply = useSelector(unapplySelector(activity_id));

    useEffect(() => {
      if (apply) {
        setToggleButton(false);
      } else if (unapply) {
        setToggleButton(true);
      }
    }, [apply, unapply]);

    const openUnapplyModal = () => {
      dispatch(
        modalAction.modalShow({
          modalProps: {
            open: true,
            title,
            message: description,
            send: () => {
              dispatch(
                modalActivities.unapplyActivity({
                  payload: {
                    user_id,
                    activity_id,
                  },
                }),
              );
            },
          },
          modalType: 'unapply',
        }),
      );
    };
    return (
      <div className="d-flex justify-content-around">
        {toggleButton ? (
          <ApplyButton
            activity_id={activity_id}
            user_id={user_id}
            title={title}
            description={description}
          />
        ) : (
          <button
            className="btn btn-danger btn-sm"
            onClick={openUnapplyModal}
            type="button"
          >
            Despostularme
          </button>
        )}
        {withLink ? (
          <Link
            to={`/detail/${activity_id}`}
            className="btn btn-secondary btn-sm"
          >
            Ver más
          </Link>
        ) : null}
      </div>
    );
  },
);

export default ActivitiesButtons;
