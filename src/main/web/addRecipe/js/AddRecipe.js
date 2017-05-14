import React, {Component} from "react";
import {connect} from "react-redux";
import AddRecipeWizardForm from "./AddRecipeWizardForm";
import "../style/AddRecipe.scss";
import {handleSubmit} from "./addRecipeSubmitter";

class AddRecipe extends Component {

  render() {
    return (
      <div className="AddRecipe">
        <h3>Add recipe</h3>
        <AddRecipeWizardForm onSubmit={handleSubmit(this.props.dispatch)}/>
      </div>
    );
  }
}

AddRecipe = connect()(AddRecipe);

export default AddRecipe;