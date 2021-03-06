import React, {Component} from "react";
import {connect} from "react-redux";
import "../style/Recipe.scss";
import PropTypes from "prop-types";
import {fetchAuthorIfNeeded, fetchRecipeIfNeeded} from "./actions/actions";
import {Col, Grid, Row} from "react-bootstrap";
import Loader from "../../util/js/Loader";
import RecipeTable from "./RecipeTable";
import RecipeIngredients from "./RecipeIngredients";
import RecipeAuthor from "./RecipeAuthor";
import Comments from "./Comments";
import NewCommentForm from "./NewCommentForm";
import {handleSubmit} from "./newCommentSubmitter";
import Share from "./Share";
import RecipeError from "./RecipeError";
import SaveToPdf from "./SaveToPdf";
import AddToFavourites from "./AddToFavourites";

class Recipe extends Component {

  componentDidMount() {
    const {match, dispatch} = this.props;
    const recipeId = Number(match.params.recipeId);
    dispatch(fetchRecipeIfNeeded(recipeId));
    dispatch(fetchAuthorIfNeeded(recipeId));
  }

  render() {
    const {loggedIn, dispatch, recipes, match, authors} = this.props;

    const recipeId = Number(match.params.recipeId);
    const fullRecipe = recipes[recipeId];

    const recipeError = fullRecipe && fullRecipe.error;
    if (recipeError) {
      return (<div className="Recipe"><RecipeError errorType={recipeError}/></div>);
    }

    const recipeFetching = fullRecipe && fullRecipe.isFetching;
    const recipe = fullRecipe ? fullRecipe.data : fullRecipe;

    const recipeIngredients = (recipe && recipe.ingredients)
        ? recipe.ingredients : [];

    const author = authors[recipeId];

    return (
        <div className="Recipe">
          <Grid>
            <Row>
              <Col md={6} className="title">
                {recipeFetching && <Loader/>}
                <h1>{recipe && recipe.name}</h1>
                {recipe && <Share recipeId={recipe.id}/>}
              </Col>
              <RecipeTable recipe={recipe}/>
            </Row>

            <Row>
              <Col md={6}>
                <RecipeAuthor author={author}/>
                <RecipeIngredients recipeIngredients={recipeIngredients}/>
              </Col>
              <Col md={6}>
                <h3>Directions</h3>
                <p className="directions">{recipe && recipe.cookingDescription}</p>
                <SaveToPdf recipeId={recipeId}/>
                {recipe && loggedIn && <AddToFavourites recipeId={recipeId}
                                                        fullRecipe={fullRecipe}/>}
              </Col>
            </Row>
            <Comments recipeId={recipeId}/>
            <NewCommentForm
                onSubmit={handleSubmit(recipeId, dispatch)}/>
          </Grid>
        </div>
    );
  }
}

Recipe.propTypes = {
  recipes: PropTypes.object.isRequired,
  authors: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    recipes: state.recipes.byId,
    authors: state.recipes.authorByRecipeId,
    loggedIn: state.auth.loggedIn
  }
};

Recipe = connect(mapStateToProps)(Recipe);

export default Recipe;
