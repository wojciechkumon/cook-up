import React, {Component} from "react";
import {connect} from "react-redux";
import "../style/Recipe.scss";
import PropTypes from "prop-types";
import {fetchAuthorIfNeeded, fetchRecipeIfNeeded} from "./actions/actions";
import {Col, Grid, Row} from "react-bootstrap";
import Loader from "../../util/js/Loader";
import RecipeTable from "./RecipeTable";
import RecipeIngredients from "./RecipeIngredients";
import Comments from "./Comments";
import NewCommentForm from "./NewCommentForm";
import {handleSubmit} from "./newCommentSubmitter";
import Share from './Share';

class Recipe extends Component {

  componentDidMount() {
    const recipeId = Number(this.props.match.params.recipeId);
    this.props.dispatch(fetchRecipeIfNeeded(recipeId));
    this.props.dispatch(fetchAuthorIfNeeded(recipeId));
  }

  render() {
    const recipeId = Number(this.props.match.params.recipeId);
    let recipe = this.props.recipes[recipeId];
    const recipeFetching = recipe && recipe.isFetching;
    recipe = recipe ? recipe.data : recipe;

    const recipeIngredients = (recipe && recipe.ingredients) ?
        recipe.ingredients : [];

    let author = this.props.authors[recipeId];
    const authorFetching = author && author.isFetching;
    author = author ? author.data : undefined;
    console.log(author && author.id + ' ' + author.email);
    if (authorFetching) {
      console.log('author fetching');
    }

    return (
        <div className="Recipe">
          <Grid>
            <Row className="show-grid">
              <Col md={6} className="title">
                {recipeFetching && <Loader/>}
                <h1>{recipe && recipe.name}</h1>
                <Share />
              </Col>
              <RecipeTable recipe={recipe}/>
            </Row>

            <Row className="show-grid">
              <Col md={6}>
                <h3>Author</h3>
                <p>{author && author.email}</p>
                <RecipeIngredients recipeIngredients={recipeIngredients}/>
              </Col>
              <Col md={6}>
                <h3>Directions</h3>
                <p>{recipe && recipe.cookingDescription}</p>
              </Col>
            </Row>
            <Comments recipeId={recipeId}/>
            <NewCommentForm onSubmit={handleSubmit(recipeId, this.props.dispatch)}/>
          </Grid>
        </div>
    );
  }
}

Recipe.propTypes = {
  recipes: PropTypes.object.isRequired,
  authors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.byId,
    authors: state.recipes.authorByRecipeId
  }
};

Recipe = connect(mapStateToProps)(Recipe);

export default Recipe;
