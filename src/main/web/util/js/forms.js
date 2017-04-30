import React from "react";
import "../style/forms.scss";

export const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
  <div>
    <input {...input} placeholder={label} type={type}/>
    {touched && (error && <div className="form-error">{error}</div>)}
  </div>
);