import React from 'react';
import Ods from './Ods';

import ChangePassword from './ChangePassword';
import MyPersonalData from './MyPersonalData';

const Profile = ({ user }) => (
  <>
    <ChangePassword />
    <MyPersonalData user={user} />
    <Ods ods={user.sdgs} userId={user.id} />
  </>
);

export default Profile;
