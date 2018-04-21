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
    return (
      <div className="recipe" style={this._getStyle()}>
        { this.props.recipe.name }
      </div>
    );
  }
}

export default Recipe;

