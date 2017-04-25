import React, {Component} from "react";
import {connect} from "react-redux";
import '../style/Recipe.scss';
import PropTypes from "prop-types";
import {
  fetchRecipeIfNeeded,
  fetchCommentsIfNeeded,
  fetchAuthorIfNeeded
} from "./actions/actions";
import {Col, Grid, Row, Table} from "react-bootstrap";
import {Field, reduxForm} from 'redux-form';
import Loader from '../../util/js/Loader';

class Recipe extends Component {

  componentDidMount() {
    const recipeId = Number(this.props.match.params.recipeId);
    this.props.dispatch(fetchRecipeIfNeeded(recipeId));
    this.props.dispatch(fetchCommentsIfNeeded(recipeId));
    this.props.dispatch(fetchAuthorIfNeeded(recipeId));
  }

  render() {
    const recipeId = parseInt(this.props.match.params.recipeId);
    let recipe = this.props.recipes[recipeId];
    const recipeFetching = recipe && recipe.isFetching;
    recipe = recipe ? recipe.data : recipe;
    let comments = this.props.allComments[recipeId];
    const commentsFetching = comments && comments.isFetching;
    comments = comments && comments.data ? comments.data : [];
    comments = comments.map(c => {
      const author = (c.authorId && c.authorEmail) ? ' author: ' + c.authorEmail
          : ' anonymous';
      return <div key={c.id} className="Comment"><h6>{author}</h6><p>{c.content}</p></div>;
    });

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
              <Col md={6}>
                {recipeFetching && <Loader/>}
                <h1>{recipe && recipe.name}</h1>
                <i className="glyphicon glyphicon-heart"/>
              </Col>
              <Col md={6} id="info">
                <Table>
                  <thead>
                  <tr>
                    <th>Cooking Time</th>
                    <th>Difficulty</th>
                    <th>Kcal</th>
                    <th>Servings</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>{recipe && recipe.cookingTimeMinutes + ' min'}</td>
                    <td>{recipe && recipe.difficultyLevel}</td>
                    <td>{recipe && recipe.kcal + ' kcal'}</td>
                    <td>{recipe && recipe.servings + ' servings'}</td>
                  </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>

            <Row className="show-grid">
              <Col md={6}>
                <h3>Ingredients</h3>
                <div>{recipe && recipe.ingredients.map(i =>
                    <div key={i.ingredient.id} className="Ingredient">
                      <i className="glyphicon glyphicon-plus"/>
                      {i.amount + ' ' + i.ingredient.ingredientUnit + ' '
                      + i.ingredient.name}
                    </div>
                )}</div>
              </Col>
              <Col md={6}>
                <h3>Directions</h3>
                <p>{recipe && recipe.cookingDescription}</p>
              </Col>
            </Row>

            <Row className="show-grid">
              <Col md={6}>
                <h3>Comments {'(' + comments.length + ')'}</h3>
                {commentsFetching && <Loader/>}
                {comments}
              </Col>
              <Col md={6}/>
            </Row>
          </Grid>
        </div>
    );
  }
}

Recipe.propTypes = {
  recipes: PropTypes.object.isRequired,
  allComments: PropTypes.object.isRequired,
  authors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.byId,
    allComments: state.recipes.commentsByRecipeId,
    authors: state.recipes.authorByRecipeId
  }
};

Recipe = connect(mapStateToProps)(Recipe);

export default Recipe;
