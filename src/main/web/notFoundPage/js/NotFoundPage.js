import React, {Component} from "react";
import "../style/NotFoundPage.scss";

class NotFoundPage extends Component {

  render() {
    return (
        <div className="NotFoundPage">
          <p className="title-error-404">404</p>
          <p>page not found</p>
        </div>
    );
  }
}

export default NotFoundPage;
