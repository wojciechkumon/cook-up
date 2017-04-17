import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import client from "../../restclient/client";
import {addRecipe} from "./actions/actions";

class Recipe extends Component {

  constructor() {
    super();
    this.state = {
      comments: [],
      author: undefined
    };
  }

  componentDidMount() {
    const recipeId = parseInt(this.props.match.params.recipeId);
    const recipes = this.props.recipes;
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe) {
      this.getAuthorAndComments(recipe);
      return;
    }

    client({method: 'GET', path: '/api/recipes/' + recipeId})
      .then(rs => {
        this.getAuthorAndComments(rs.entity);
        this.props.dispatch(addRecipe(rs.entity));
      });
  }

  getAuthorAndComments(recipe) {
    recipe.comments
      .then(rs => this.setState({comments: rs.entity._embedded.recipeCommentDtoes}));
    recipe.author
      .then(rs => this.setState({author: rs.entity}));
  }

  render() {
    const recipeId = parseInt(this.props.match.params.recipeId);
    const recipes = this.props.recipes;
    const recipe = recipes.find(r => r.id === recipeId);

    const comments = this.state.comments.map(c => {
      const author = (c.authorId && c.authorEmail) ? ' author: ' + c.authorId + ', ' + c.authorEmail
        : ' anonymous';
      return c.content + author + ' ';
    });
    const author = this.state.author;
    return (
      <div>
        <br/><br/>
        author {author && author.email + ', id=' + author.id}
        <br/><br/>
        {recipe && recipe.name + ', description: ' + recipe.cookingDescription}
        <br/>
        comments:
        <br/>
        {comments}
        <br/><br/><br/><br/>
      </div>
    );
  }
}

Recipe.propTypes = {
  recipes: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.recipeList
  }
};

Recipe = connect(mapStateToProps)(Recipe);

export default Recipe;
