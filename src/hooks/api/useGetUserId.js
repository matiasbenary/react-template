import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';

const userIdSelector = createSelector(
  (state) => state.auth.user.id,
  (userId) => userId,
);

const useGetUserId = () => useSelector(userIdSelector);

export default useGetUserId;
