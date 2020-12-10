import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { actions as userActivitiesAction } from '../../../../store/ducks/user/activities.duck';

const parseOptions = (data) => data.map((opt) => ({ value: opt.id, label: opt.title }));

const SelectActivity = ({ isSummit, setIsInvalid, addForm }) => {
  const dispatch = useDispatch();

  const { user_id, userActivities } = useSelector(
    (state) => ({
      user_id: state.auth.user.id,
      userActivities: state.userActivities.activities,
    }),
  );

  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (isSummit && selectedOption) {
      setIsInvalid(false);
      addForm('activity_id', selectedOption.value);
    }
  }, [isSummit]);

  useEffect(() => {
    if (!userActivities) {
      dispatch(userActivitiesAction.getActivities(user_id));
    }
  }, [user_id, userActivities]);

  if (!userActivities) return <Select isDisabled />;

  return (
    <Select
      defaultValue={selectedOption}
      onChange={setSelectedOption}
      options={parseOptions(userActivities.data)}
    />
  );
};

export default SelectActivity;
