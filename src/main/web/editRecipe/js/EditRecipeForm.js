import React, {Component} from "react";
import PropTypes from "prop-types";

class EditRecipeForm extends Component {

  componentDidMount() {
    // clear form
  }

  render() {
    const {recipe} = this.props;
    return (
      <div>EditRecipeForm {recipe.name}</div>
    );
  }
}

EditRecipeForm.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default EditRecipeForm;