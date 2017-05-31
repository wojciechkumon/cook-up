import React, {Component} from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import formValueSelector from "redux-form/es/formValueSelector";
import {fetchCreatedRecipesIfNeeded} from "../../me/js/actions/actions";
import Loader from "../../util/js/Loader";
import EditRecipeForm from "./EditRecipeForm";
import {handleSubmit} from "./editRecipeSubmitter";

class RecipeEditor extends Component {

  componentDidMount() {
    this.props.dispatch(fetchCreatedRecipesIfNeeded());
  }

  render() {
    const fetching = this.props.ids.isFetching;
    if (fetching) {
      return (
        <div>
          <h4>Edit recipe</h4>
          <Loader/>
        </div>
      );
    }

    const {match, dispatch, history, chosenIngredients} = this.props;
    const recipeId = Number(match.params.recipeId);
    const ids = this.props.ids.data;
    if (!ids.includes(recipeId)) {
      return (
        <div>
          <h4>Edit recipe</h4>
          <p>Recipe not exists or you're not its owner!</p>
        </div>
      );
    }

    let recipe = this.props.recipes[recipeId];
    recipe = recipe ? recipe.data : undefined;

    return (
      <div>
        <h4>Edit recipe</h4>
        {recipe &&
         <EditRecipeForm
           onSubmit={handleSubmit(dispatch, history, recipeId)}
           recipe={recipe}
           chosenIngredients={chosenIngredients}/>}
        {!recipe && <Loader/>}
      </div>
    );
  }
}

RecipeEditor.propTypes = {
  recipes: PropTypes.object.isRequired,
  ids: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    isFetching: PropTypes.bool
  }).isRequired
};

const selector = formValueSelector('edit-recipe-wizard');
const mapStateToProps = state => {
  return {
    recipes: state.recipes.byId,
    ids: state.me.createdRecipeIds,
    chosenIngredients: selector(state, 'ingredients')
  }
};

RecipeEditor = connect(mapStateToProps)(RecipeEditor);

export default withRouter(RecipeEditor);