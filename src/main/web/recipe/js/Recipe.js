import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import client from "../../restclient/client";

class Recipe extends Component {

  constructor() {
    super();
    this.state = {comments: []};
  }

  componentDidMount() {
    const recipeId = parseInt(this.props.match.params.recipeId);
    const recipes = this.props.recipes;
    if (recipes.find(r => r.id === recipeId)) {
      return;
    }

    client({method: 'GET', path: '/api/recipes/' + recipeId})
      .then(response => {
        response.entity.comments
          .then(r => this.setState({comments: r.entity._embedded.recipeCommentDtoes}));
      });
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
    return (
      <div>
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
