import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actions as modalAction } from '../../../store/ducks/modal.duck';
import { actions as modalActivities } from '../../../store/ducks/activities.duck';
import { actions as userActivitiesAction } from '../../../store/ducks/user/activities.duck';
import ApplyButton from '../../molecules/ApplyButton';

const ActivitiesButtons = ({
  user_id,
  activity_id,
  isApply,
  title,
  description,
  withLink,
}) => {
  const dispatch = useDispatch();

  const [toggleButton, setToggleButton] = useState(isApply);

  // const { loading } = useSelector((state) => ({
  //   loading: state.activities.loadingApply,
  // }));

  const {
 loadingApply, apply, errorApply, applyId,
} = useSelector((state) => ({
    loadingApply: state.activities.loadingApply,
    apply: state.activities.apply,
    errorApply: state.activities.errorApply,
    applyId: state.activities.applyId,
  }));

  const {
 loadingUnapply, unapply, errorUnapply, unapplyId,
} = useSelector(
    (state) => ({
      loadingUnapply: state.activities.loadingUnapply,
      unapply: state.activities.unapply,
      errorUnapply: state.activities.errorUnapply,
      unapplyId: state.activities.unapplyId,
    }),
  );

  useEffect(() => {
    if (applyId == activity_id && apply !== '') {
      setToggleButton(false);
    } else if (unapplyId == activity_id && unapply !== '') {
      setToggleButton(true);
    }
  }, [applyId, unapply]);

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
    <>
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
          type="button"
        >
          Ver más
        </Link>
      ) : null}
    </>
  );
};

export default ActivitiesButtons;
