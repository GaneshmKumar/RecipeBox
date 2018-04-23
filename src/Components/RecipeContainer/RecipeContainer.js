import React, { Component } from 'react';
import shortid from 'shortid';
import './RecipeContainer.scss';
import Recipe from './Recipe/Recipe';
import RecipeModal from './RecipeModal/RecipeModal';

const colors = ['#6A1B9A', '#283593', '#F44336', '#19bd9b', '#689F38', '#EF6C00', '#4E342E', '#424242'];
const localStorageRecipes = JSON.parse(localStorage.getItem('recipes'));

const recipes = localStorageRecipes ||
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
      isModalOpen: false,
      isDeleteEnabled: true
    };
  }

  componentDidMount () {
    this._updateLocalStorage(this.state.recipes);
  }

  _addRecipe () {
    const currentRecipe = {
      name: '',
      ingredients: []
    };

    this.setState({
      currentRecipe,
      isModalOpen: true,
      isDeleteEnabled: false
    });
  }

  _openRecipe (e) {
    const { id } = e.target.dataset;

    const currentRecipe = Object.assign({}, this.state.recipes.find(recipe => id === recipe.id));

    this.setState({
      currentRecipe,
      isModalOpen: true,
      isDeleteEnabled: true
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

  _deleteRecipe () {
    const { recipes, currentRecipe } = this.state;
    const index = recipes.findIndex(recipe => recipe.id === currentRecipe.id);
    recipes.splice(index, 1);

    this.setState({
      isModalOpen: false,
      recipes
    });

    this._updateLocalStorage(recipes);
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
    const { recipes, currentRecipe, isModalOpen, isDeleteEnabled } = this.state;

    return (
      <div className="recipe-modal-container">
        <div className="add-recipe" role="button" tabIndex={0} onClick={() => this._addRecipe()}>+</div>
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
            isDeleteEnabled={isDeleteEnabled}
            handleChange={e => this._handleChange(e)}
            saveRecipe={() => this._saveRecipe()}
            cancelSave={() => this._cancelSave()}
            deleteRecipe={() => this._deleteRecipe()}
            resetCurrentRecipe={() => this._resetCurrentRecipe()}
          />
        }
      </div>
    );
  }
}

export default RecipeContainer;

