import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";
import {maxLength, required} from "../../util/js/validators";
import {renderField} from "../../util/js/forms";
import "../style/NewCommentForm.scss";

const maxLength255 = maxLength(255);

class NewCommentForm extends Component {

  render() {
    const {handleSubmit, submitting} = this.props;
    return (
      <form className="NewCommentForm" onSubmit={handleSubmit}>
        <div>
          <Field name="content" type="text"
                 component={renderField} label="Content"
                 validate={[required, maxLength255]}/>
        </div>
        <button type="submit" disabled={submitting}>Submit</button>
      </form>
    );
  }
}

const handleSubmit = (values) => {
  console.log('handleSub');
  console.log(values);
};

NewCommentForm = reduxForm({
  form: 'new-comment',
  onSubmit: handleSubmit
})(NewCommentForm);

export default NewCommentForm;
