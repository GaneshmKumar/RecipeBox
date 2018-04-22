import React, { Component } from 'react';
import './Recipe.scss';

class Recipe extends Component {
  _getStyle () {
    return {
      background: this.props.color,
      borderColor: this.props.color
    };
  }

  render () {
    const { recipe, _openRecipe } = this.props;

    return (
      <div className="recipe" role="button" data-id={recipe.id} style={this._getStyle()} onClick={_openRecipe} tabIndex={0}>
        { recipe.name }
      </div>
    );
  }
}

export default Recipe;

