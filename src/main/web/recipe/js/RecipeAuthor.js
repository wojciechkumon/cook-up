import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "../../util/js/Loader";
import "../style/RecipeAuthor.scss";

class RecipeAuthor extends Component {

  render() {
    let {author} = this.props;

    const authorError = author && author.error;
    const authorFetching = author && author.isFetching;
    author = author ? author.data : undefined;
    const url = author && '/user/' + author.id;

    return (
        <div className="RecipeAuthor">
          <h3>Author</h3>
          {authorFetching && <Loader/>}
          {authorError && 'Error while fetching author'}
          <p>{author && <Link to={url}>{author.email}</Link>}</p>
        </div>
    );
  }
}

RecipeAuthor.propTypes = {
  author: PropTypes.shape({
    isFetching: PropTypes.bool,
    didInvalidate: PropTypes.bool,
    data: PropTypes.shape({
      id: PropTypes.number,
      email: PropTypes.string
    })
  })
};

export default RecipeAuthor;
