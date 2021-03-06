import React, {Component} from "react";
import Field from "redux-form/es/Field";
import reduxForm from "redux-form/es/reduxForm";
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
                 component={renderField} label="Add comment..."
                 validate={[required, maxLength255]}/>
        </div>
        <button type="submit" disabled={submitting}>Submit</button>
      </form>
    );
  }
}

NewCommentForm = reduxForm({
  form: 'new-comment-form'
})(NewCommentForm);

export default NewCommentForm;
