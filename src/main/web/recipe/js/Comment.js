import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import "../style/Comment.scss";

class Comment extends Component {

  render() {
    const comment = this.props.comment;
    const url = comment && '/user/' + comment.authorId;
    const author = (comment.authorId && comment.authorEmail) ?
        <Link to={url}>{comment.authorEmail}</Link> : ' anonymous';

    return (
        <div className="Comment">
          <p className="author">{author}</p>
          <p className="comment-content">{comment.content}</p>
        </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    authorId: PropTypes.number,
    authorEmail: PropTypes.string
  }).isRequired
};

export default Comment;
