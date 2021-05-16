import React from "react";
import { useDispatch } from "react-redux";
import { actions as modalAction } from "../../../store/ducks/modal.duck";
import { actions as modalActivities } from "../../../store/ducks/activities.duck";
import { ButtonPrimary } from "../Button";

const ApplyButton = ({
  activity, userId, setChange
}) => {
  const dispatch = useDispatch();
  const sendApplyInfo = (postulation_reason,forms) => {
    setChange();
    const payload = {
      postulation_reason,
      user_id:userId,
      activity_id:activity.id,
      forms
    };
    dispatch(modalActivities.applyActivity({ payload }));
  };

  const openApplyModal = () => {
    dispatch(
      modalAction.modalShow({
        modalProps: {
          open: true,
          title:activity.title,
          message: activity.short_description,
          forms:(activity.form && [...activity.form.fields]),
          send: (postulation_reason,forms) => sendApplyInfo(postulation_reason,forms),
        },
        modalType: "apply",
      })
    );
  };
  return (
    <ButtonPrimary
      onClick={openApplyModal}
      type="button"
    >
      Postularme
    </ButtonPrimary>
  );
};

export default ApplyButton;
