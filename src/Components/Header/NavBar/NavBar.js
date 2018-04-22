import React, { Component } from 'react';
import './NavBar.scss';

class NavBar extends Component {
  render () {
    return (
      <nav className="nav">
        <h1 className="app-title">
          <a href="/RecipeBox">Recipe Box</a>
        </h1>
      </nav>
    );
  }
}

export default NavBar;
