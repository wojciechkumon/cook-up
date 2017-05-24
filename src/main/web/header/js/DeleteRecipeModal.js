import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Modal} from "react-bootstrap";

class DeleteRecipeModal extends Component {

  render() {
    const {recipeName, deleteRecipe, showModal, closeModal} = this.props;
    return (
      <Modal show={showModal}
             onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Remove recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>Delete {recipeName}?</Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={deleteRecipe}>Delete</Button>
          <Button onClick={closeModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

DeleteRecipeModal.propTypes = {
  recipeName: PropTypes.string.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired
};

export default DeleteRecipeModal;