import React, { useState } from 'react'
import ApplyButton from '../ApplyButton';
import Button from '../Button';
import NotApplyButton from '../NotApplyButton';

const ActivitiesButtons = ({activity,userId,isApply,isEnable}) => {

  const [status, setStatus] = useState(false);
  const toogleStatus = () => setStatus(!status);

  /* ^ XOR, funciona como negado controlado
  isApply status resultado
  0       0       0
  0       1       1
  1       0       1
  1       1       0
  */
  if(isApply ^ status) return <NotApplyButton activity={activity} userId={userId} setChange={toogleStatus}/>
  if(isEnable) return <ApplyButton activity={activity} userId={userId}  setChange={toogleStatus}/>
  return <Button>Postularme</Button>
}

export default ActivitiesButtons
