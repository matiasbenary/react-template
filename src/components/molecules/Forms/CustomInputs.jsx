import React from "react";
import WarningSpan from "../WarningSpan";

const CustomDateInput = ({
  label,
  field,
  form: { touched, errors },
  ...props
}) => (
  <div className="col col-md-5">
    <label htmlFor={props.id || props.name}>{label}</label>
    <input type="date" className="form-control" {...field} {...props} />
    {touched[field.name] && errors[field.name] && (
      <WarningSpan msj={errors[field.name]} />
    )}
  </div>
);

const CustomTextarea = ({
  label,
  field,
  form: { touched, errors },
  ...props
}) => (
  <div className="form-group">
    <label htmlFor={props.id || props.name}>{label}</label>
    <textarea className="form-control" {...field} {...props} />
    {touched[field.name] && errors[field.name] && (
      <WarningSpan msj={errors[field.name]} />
    )}
  </div>
);

export { CustomDateInput, CustomTextarea };
