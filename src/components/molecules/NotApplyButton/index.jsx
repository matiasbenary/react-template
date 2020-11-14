import React from "react";
import { useDispatch } from "react-redux";
import { actions as modalAction } from "../../../store/ducks/modal.duck";
import { actions as modalActivities } from "../../../store/ducks/activities.duck";
import { ButtonWarning } from "../Button";

const NotApplyButton = ({
  activity, userId , setChange
}) => {
  const dispatch = useDispatch();


  const openNotApplyModal = () => {
    dispatch(
      modalAction.modalShow({
        modalProps: {
          open: true,
          title:activity.title,
          message: activity.short_description,
          send: () => {
            setChange();
            dispatch(
              modalActivities.unapplyActivity({
                payload: {
                  user_id:userId,
                  activity_id:activity.id,
                },
              })
            );
          },
        },
        modalType: "unapply",
      })
    );
  };

  return (
    <ButtonWarning
    onClick={openNotApplyModal}
            type="button"
    >
      Despostularme
    </ButtonWarning>
  );
};

export default NotApplyButton;
