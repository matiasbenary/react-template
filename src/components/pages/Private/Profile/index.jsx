import React from "react";
import Ods from "./Ods";

import ChangePassword from "./ChangePassword";
import MyPersonalData from "./MyPersonalData";

const Profile = ({user}) => {

   /*

   */
  console.log(user)
  return (
    <>
    <ChangePassword></ChangePassword>
    <MyPersonalData user={user}></MyPersonalData>
      <Ods ods={user.sdgs} userId={user.id}/>

    </>
  );
};

export default Profile;
