import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import AddRecipeWizardForm from "./AddRecipeWizardForm";
import "../style/recipeForm.scss";
import {handleSubmit} from "./addRecipeSubmitter";

class AddRecipe extends Component {

  render() {
    const {dispatch, history} = this.props;

    return (
      <div className="recipe-form">
        <h2>Add recipe</h2>
        <AddRecipeWizardForm onSubmit={handleSubmit(dispatch, history)}/>
      </div>
    );
  }
}

AddRecipe = connect()(AddRecipe);

export default withRouter(AddRecipe);