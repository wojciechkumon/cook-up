import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import "../style/Comment.scss";

class Comment extends Component {

  render() {
    const {comment} = this.props;
    const url = comment && '/user/' + comment.authorId;
    const author = (comment.authorId && comment.authorEmail) ?
                   <Link className="author" to={url}>{comment.authorEmail}</Link> :
                   <span className="anonymous">anonymous</span>;

    return (
        <div className="Comment">
          <p>{author}</p>
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
