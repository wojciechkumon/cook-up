import React, {Component} from "react";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import {deleteCreatedRecipe} from "./actions/actions";
import DeleteRecipeModal from "../../header/js/DeleteRecipeModal";

class DeleteRecipeListRow extends Component {

  constructor() {
    super();
    this.state = {showModal: false};
  }

  deleteRecipe = e => {
    const {dispatch, recipe} = this.props;
    dispatch(deleteCreatedRecipe(recipe.id));
    e.stopPropagation();
  };

  openModal = e => {
    this.setState({showModal: true});
    e.stopPropagation();
  };

  closeModal = () => {
    this.setState({showModal: false});
  };

  render() {
    const {recipe} = this.props;
    const {showModal} = this.state;
    return (
      <td className="remove-button" onClick={this.openModal}>
        <FontAwesome name="times"/>
        <DeleteRecipeModal recipeName={recipe.name}
                           deleteRecipe={this.deleteRecipe}
                           showModal={showModal}
                           closeModal={this.closeModal}/>
      </td>
    );
  }
}

DeleteRecipeListRow.propTypes = {
  recipe: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default DeleteRecipeListRow;