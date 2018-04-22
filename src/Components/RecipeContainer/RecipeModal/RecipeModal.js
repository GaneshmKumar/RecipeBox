import React, { Component } from 'react';
import classnames from 'classnames';
import './RecipeModal.scss';

class RecipeModal extends Component {
  _getModalClass () {
    return classnames({
      modal: true,
      'modal-open': this.props.isModalOpen
    });
  }

  render () {
    const { recipe, handleChange, isModalOpen, saveRecipe, cancelSave } = this.props;

    return (
      isModalOpen &&
        <div className="modal-overlay">
          <div className={this._getModalClass()}>
            <div className="modal-header">
              <input type="text" name="name" className="recipe-input" onChange={handleChange} placeholder="Recipe Name" value={recipe.name} />
            </div>
            <div className="modal-content">
              <textarea name="ingredients" className="recipe-ingredients" onChange={handleChange} placeholder="Ingredients (Separated by comma)" value={recipe.ingredients && recipe.ingredients.join(',')} />
            </div>
            <div className="modal-footer">
              <button className="modal-save btn btn-success" onClick={saveRecipe}>Save</button>
              <button className="modal-close btn btn-danger" onClick={cancelSave}>Cancel</button>
            </div>
          </div>
        </div>
    );
  }
}

export default RecipeModal;
