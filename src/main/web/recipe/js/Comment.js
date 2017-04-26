import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Col, Row} from "react-bootstrap";

class Comment extends Component {

  render() {
    const comment = this.props.comment;
    const author = (comment.authorId && comment.authorEmail) ?
        ' author: ' + comment.authorEmail : ' anonymous';
    return (
        <div className="Comment">
          <h6>{author}</h6>
          <p>{comment.content}</p>
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
