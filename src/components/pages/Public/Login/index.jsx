import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

const Login = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');

  switch (step) {
    case 1:
      return (
        <StepOne next={setStep} email={email} setEmail={setEmail} />
      );
    case 2:
      return <StepTwo previous={setStep} email={email} />;
  }
};

export default Login;
