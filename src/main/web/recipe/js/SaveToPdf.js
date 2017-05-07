import React, {Component} from "react";
import FontAwesome from "react-fontawesome";
import "../style/SaveToPdf.scss";

class SaveToPdf extends Component {

  render() {
    return (
      <h3 className="SaveToPdf">
        Save recipe to pdf <FontAwesome className="pdf-icon" name="file-pdf-o"/>
      </h3>
    );
  }
}

export default SaveToPdf;
