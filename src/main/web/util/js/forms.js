import React from "react";
import "../style/forms.scss";

export const renderField = ({input, label, type, meta: {touched, error, warning, asyncValidating}}) => (
  <div className={asyncValidating ? 'Field async-validating' : 'Field'}>
    <input {...input} placeholder={label} type={type}/>
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