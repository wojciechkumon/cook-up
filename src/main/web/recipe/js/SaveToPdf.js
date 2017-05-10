import React, {Component} from "react";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import "../style/SaveToPdf.scss";

class SaveToPdf extends Component {

  render() {
    const {recipeId} = this.props;
    const recipePdfPath = '/api/recipePdf/' + recipeId + '.pdf';

    return (
      <h3 className="SaveToPdf">
        <span>Save recipe to pdf</span>
        <a href={recipePdfPath} target="_blank">
          <FontAwesome className="pdf-icon" name="file-pdf-o"/>
        </a>
      </h3>
    );
  }
}

SaveToPdf.propTypes = {
  recipeId: PropTypes.number.isRequired
};

export default SaveToPdf;
