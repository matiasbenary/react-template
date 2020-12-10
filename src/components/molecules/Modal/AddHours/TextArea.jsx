import React, { useState } from 'react';

const TextArea = ({ isSummit, setIsInvalid }) => {
  const [text, setText] = useState('');
  if (isSummit && text.length) {
    setIsInvalid(false);
  }
  return (
    <>
      Cuéntanos qué tareas realizaste
      <textarea className="form-control" value={text} onChange={(e) => setText(e.target.value)} />
    </>
  );
};

export default TextArea;
