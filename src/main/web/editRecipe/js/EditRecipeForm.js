import React, {Component} from "react";
import PropTypes from "prop-types";
import {reset} from "redux-form/es/actions";
import {connect} from "react-redux";
import EditRecipeFirstPage from "./EditRecipeFirstPage";
import EditRecipeSecondPage from "./EditRecipeSecondPage";
import EditRecipeThirdPage from "./EditRecipeThirdPage";
import {mapToInitialValues} from "./recipeFormMapper";

class EditRecipeForm extends Component {

  constructor() {
    super();
    this.state = {page: 1}
  }

  componentDidMount() {
    this.props.dispatch(reset('edit-recipe-wizard'));
  }

  nextPage = () => {
    this.setState({page: this.state.page + 1})
  };

  previousPage = () => {
    this.setState({page: this.state.page - 1})
  };

  render() {
    const {recipe, onSubmit, chosenIngredients} = this.props;
    const initialValue = mapToInitialValues(recipe);

    const {page} = this.state;
    return (
      <div>
        {page === 1 &&
         <EditRecipeFirstPage onSubmit={this.nextPage}
                              initialValues={initialValue}
                              chosenIngredients={chosenIngredients}
         />}
        {page === 2 &&
         <EditRecipeSecondPage
           previousPage={this.previousPage}
           onSubmit={this.nextPage}
           initialValues={initialValue}
         />}
        {page === 3 &&
         <EditRecipeThirdPage
           previousPage={this.previousPage}
           onSubmit={onSubmit}
           initialValues={initialValue}
         />}
      </div>
    )
  }
}

EditRecipeForm.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default connect()(EditRecipeForm);