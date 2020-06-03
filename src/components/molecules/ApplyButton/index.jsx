import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions as modalAction } from "../../../store/ducks/modal.duck";
import { actions as modalActivities } from "../../../store/ducks/activities.duck";

const ApplyButton = ({
  user_id,
  activity_id,
  title,
  description,
  disabled
}) => {
  const dispatch = useDispatch();

  const sendApplyInfo = postulation_reason => {
    const payload = {
      postulation_reason,
      user_id,
      activity_id
    };
    dispatch(modalActivities.applyActivity({ payload }));
  };

  const openApplyModal = () => {
    dispatch(
      modalAction.modalShow({
        modalProps: {
          open: true,
          title,
          message: description,
          send: postulation_reason => sendApplyInfo(postulation_reason)
        },
        modalType: "apply"
      })
    );
  };
  return (
    <button
      className="btn btn-primary btn-sm"
      onClick={openApplyModal}
      type="button"
      disabled={disabled}
    >
      Postularme
    </button>
  );
};

export default ApplyButton;
