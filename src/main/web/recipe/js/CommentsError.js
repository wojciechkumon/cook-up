import React, {Component} from "react";
import "../style/CommentsError.scss";

class CommentsError extends Component {

  render() {
    return (
        <div className="CommentsError">Error while fetching comments!</div>
    );
  }
}

export default CommentsError;
