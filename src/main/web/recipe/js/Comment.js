import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment-timezone";
import "../style/Comment.scss";

class Comment extends Component {

  render() {
    const {comment} = this.props;
    const url = comment && '/user/' + comment.authorId;
    const author = (comment.authorId && comment.authorEmail) ?
                   <Link className="author" to={url}>{comment.authorEmail}</Link> :
                   <span className="anonymous">anonymous</span>;

    const createdFromNow = moment.utc(comment.created).fromNow();
    return (
        <div className="Comment">
          <p>{author}</p>
          <p className="comment-content">{comment.content}</p>
          <span className="createdTime">{createdFromNow}</span>
        </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    authorId: PropTypes.number,
    authorEmail: PropTypes.string,
    created: PropTypes.string
  }).isRequired
};

export default Comment;
