import React, { Component } from 'react';
import './RecipeContainer.scss';
import Recipe from './Recipe/Recipe';

const colors = ['#F44336', '#6A1B9A', '#283593', '19bd9b', '#689F38', '#EF6C00', '#4E342E', '#424242'];

class RecipeContainer extends Component {
  constructor (props) {
    super(props);

    this.state = {
      recipes: localStorage.getItem('recipes') || [{ name: 'a' }, { name: 'b' }, { name: 'c' }]
    };
  }

  _getRandomColor () {
    const index = Math.floor((Math.random() * colors.length) + 0);
    return colors[index];
  }

  render () {
    const { recipes } = this.state;

    return (
      <div className="recipe-container">
        {
          recipes.map(recipe => <Recipe recipe={recipe} color={this._getRandomColor()} />)
        }
      </div>
    );
  }
}

export default RecipeContainer;

