import React, { memo, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import Card from '../../molecules/Card';
import { actions } from '../../../store/ducks/activity/getActivity.duck';
import ActivitiesButtons from '../CardContainer/ActivitiesButtons';
import { actions as userActivitiesAction } from '../../../store/ducks/user/activities.duck';

const activitySelector = createSelector((state) => state.activity.activity, (activity) => activity);
const userActivitiesSelector = createSelector((state) => state.userActivities.activities, (userActivities) => userActivities);
const user_idSelector = createSelector((state) => state.auth.user.id, (user_id) => user_id);


const DetailActivity = memo(() => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const activity = useSelector(activitySelector);
  const userActivities = useSelector(userActivitiesSelector);
  const user_id = useSelector(user_idSelector);

  useEffect(() => {
    if (!activity) {
      dispatch(actions.getActivity(id));
    }
  }, [activity]);

  useEffect(() => {
    if (!userActivities) {
      dispatch(userActivitiesAction.getActivities(user_id));
    }
  }, []);

  if (activity && (userActivities)) {
    const isApply = userActivities.data.find((activityLocal) => (activityLocal.id == id))

              === undefined;
    return (
      <div className="container">
          <Card title={activity.title} descriptionHtml={(activity.description)}>
             <ActivitiesButtons
            isApply={isApply}
            activity_id={id}
            user_id={user_id}
            title={activity.title}
            description={activity.short_description}
             />
          </Card>
      </div>
    );
  }
  return null;
});

export default DetailActivity;
