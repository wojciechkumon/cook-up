import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {fetchCommentsIfNeeded} from "./actions/actions";
import {Col, Row} from "react-bootstrap";
import Comment from "./Comment";
import Loader from "../../util/js/Loader";

class Comments extends Component {

  componentDidMount() {
    const recipeId = Number(this.props.recipeId);
    this.props.dispatch(fetchCommentsIfNeeded(recipeId));
  }

  render() {
    const recipeId = Number(this.props.recipeId);
    let comments = this.props.allComments[recipeId];
    const commentsFetching = comments && comments.isFetching;
    comments = comments && comments.data ? comments.data : [];
    comments = comments.map(c => <Comment key={c.id} comment={c}/>);

    return (
        <Row className="show-grid">
          <Col md={6}>
            <h3>Comments {'(' + comments.length + ')'}</h3>
            {commentsFetching && <Loader/>}
            {comments}
          </Col>
          <Col md={6}/>
        </Row>
    );
  }
}

Comments.propTypes = {
  recipeId: PropTypes.number.isRequired,
  allComments: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    allComments: state.recipes.commentsByRecipeId
  }
};

Comments = connect(mapStateToProps)(Comments);

export default Comments;
