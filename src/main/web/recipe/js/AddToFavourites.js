import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import "../style/AddToFavourites.scss";

class AddToFavourites extends Component {

  render() {
    const {loggedIn} = this.props;
    if (!loggedIn) {
      return (<div/>);
    }

    return (
      <h3 className="AddToFavourites">
        Add to favourites <FontAwesome className="heart-icon" name="heart"/>
      </h3>
    );
  }
}

AddToFavourites.propTypes = {
  loggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn
  }
};

AddToFavourites = connect(mapStateToProps)(AddToFavourites);

export default AddToFavourites;
