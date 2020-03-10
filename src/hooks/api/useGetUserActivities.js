import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';

const userActivitiesSelector = createSelector(
  (state) => state.userActivities.activities,
  (userActivities) => userActivities,
);

const useGetUserActivities = () => useSelector(userActivitiesSelector);

export default useGetUserActivities;
