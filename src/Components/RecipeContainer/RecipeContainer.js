import React, { Component } from 'react';
import shortid from 'shortid';
import './RecipeContainer.scss';
import Recipe from './Recipe/Recipe';
import RecipeModal from './RecipeModal/RecipeModal';

const colors = ['#F44336', '#6A1B9A', '#283593', '#19bd9b', '#689F38', '#EF6C00', '#4E342E', '#424242'];
const recipes = JSON.parse(localStorage.getItem('recipes')).length > 0 ?
  JSON.parse(localStorage.getItem('recipes')) :
  [
    {
      id: shortid.generate(),
      name: 'Pizza',
      ingredients: ['Cheese', 'Dough', 'Mozzarella', 'Pepperoni', 'Tomato Sauce', 'Bread', 'Flour', 'Gluten']
    },
    {
      id: shortid.generate(),
      name: 'Chicken Momo',
      ingredients: ['White Flour', 'Vegetables', 'Chicken']
    },
    {
      id: shortid.generate(),
      name: 'Parotta',
      ingredients: ['Maida Flour', 'Eggs', 'Oil']
    },
    {
      id: shortid.generate(),
      name: 'Chicken Briyani',
      ingredients: ['Rice', 'Indian Spices', 'Vegetables', 'Chicken', 'Egg', 'Yoghurt', 'Dried Fruits']
    }
  ];

class RecipeContainer extends Component {
  constructor (props) {
    super(props);

    this.state = {
      recipes,
      currentRecipe: {
        id: '',
        name: '',
        ingredients: []
      },
      isModalOpen: false
    };
  }

  _openRecipe (e) {
    const { id } = e.target.dataset;

    const currentRecipe = Object.assign({}, this.state.recipes.find(recipe => id === recipe.id));

    this.setState({
      currentRecipe,
      isModalOpen: true
    });
  }

  _updateLocalStorage (recipes) {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }

  _saveRecipe () {
    const { recipes } = this.state;
    const { currentRecipe } = this.state;

    const index = recipes.findIndex(recipe => recipe.id === currentRecipe.id);

    if (index >= 0) {
      recipes[index] = currentRecipe;
    } else {
      currentRecipe.id = shortid.generate();
      recipes.push(currentRecipe);
    }

    this._updateLocalStorage(recipes);
    this._resetCurrentRecipe();

    this.setState({
      recipes,
      isModalOpen: false
    });
  }

  _cancelSave () {
    this.setState({
      isModalOpen: false
    });

    this._resetCurrentRecipe();
  }

  _handleChange (e) {
    const { name } = e.target;
    let { value } = e.target;

    if (name === 'ingredients') {
      value = value.split(',');
    }

    this.setState((prevState) => {
      const { currentRecipe } = prevState;
      currentRecipe[name] = value;

      return { currentRecipe };
    });
  }

  _resetCurrentRecipe () {
    const currentRecipe = {
      id: '',
      name: '',
      ingredients: []
    };

    this.setState({
      currentRecipe
    });
  }

  render () {
    const { recipes, currentRecipe, isModalOpen } = this.state;

    return (
      <div className="recipe-modal-container">
        <div className="recipe-container">
          {
            recipes.map((recipe, index) => (<Recipe
              recipe={recipe}
              color={colors[index % colors.length]}
              _openRecipe={e => this._openRecipe(e)}
            />))
          }
        </div>
        {
          <RecipeModal
            recipe={currentRecipe}
            isModalOpen={isModalOpen}
            handleChange={e => this._handleChange(e)}
            saveRecipe={() => this._saveRecipe()}
            cancelSave={() => this._cancelSave()}
            resetCurrentRecipe={() => this._resetCurrentRecipe()}
          />
        }
      </div>
    );
  }
}

export default RecipeContainer;

