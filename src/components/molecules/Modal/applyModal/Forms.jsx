import React from 'react'
import Option from './Option';
import Text from './Text';

const getComponent = (form,addAnswers)=>{
  switch (form.type) {
    case "select":
      return <Option options={form.options} addAnswers={addAnswers} />;
    case "text":
      return <Text addAnswers={addAnswers}/>;
    default:
      return null;
  }
}

const Form = ({form,setAnswers}) => {

  const addAnswers = setAnswers(form.id);

  return (<div className="form-group">
  <label htmlFor="message-text" className="col-form-label">
    {form.name}
  </label>
  {getComponent(form,addAnswers)}
  </div>)
}

export default Form
