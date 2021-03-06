import React from 'react';
import Loader from 'react-spinners/PropagateLoader';

const Loading = () => (
  <div
    className="mt-5"
    style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <Loader size={15} color="#007bff" loading />
  </div>
);

export default Loading;
