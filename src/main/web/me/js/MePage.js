import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import MyRecipes from "./MyRecipes";
import FavouriteRecipes from "./FavouriteRecipes";
import "../style/MePage.scss";

class MePage extends Component {

  render() {
    const {author} = this.props;
    return (
      <div className="MePage">
        <h4>{author}</h4>
        <MyRecipes/>
        <FavouriteRecipes/>
      </div>
    );
  }
}

MePage.propTypes = {
  author: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  return {
    author: state.auth.email
  }
};

export default connect(mapStateToProps)(MePage);