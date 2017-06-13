import React from "react";
import "../style/forms.scss";
import Loader from "./Loader";

export const renderField = ({className, input, label, type, meta: {touched, error, warning, asyncValidating}}) => (
  <div className={(className ? className + ' ' : '') + 'Field'}>
    <input {...input} placeholder={label} type={type}/>
    {asyncValidating && <Loader/>}
    {touched && ((error && <div className="form-error">{error}</div>)
                 || (warning && <div className="form-warning">{warning}</div>))}
  </div>
);

export const renderTextArea = ({input, label, rows, cols, meta: {touched, error, warning}}) => (
  <div className="TextArea">
    <textarea {...input} placeholder={label} rows={rows} cols={cols}/>
    {touched && ((error && <div className="form-error">{error}</div>)
                 || (warning && <div className="form-warning">{warning}</div>))}
  </div>
);

export const renderError = ({meta: {touched, error}}) =>
  touched && error ? <strong className="form-error">{error}</strong> : false;

export const FormError = ({error}) => {
  return (
    <strong className="form-error">{error}</strong>
  );
};

export const asyncValidationDisabledOnSubmit = ({syncValidationPasses, trigger}) => {
  if (!syncValidationPasses) {
    return false
  }
  switch (trigger) {
    case 'blur':
      return true;
    default:
      return false;
  }
};