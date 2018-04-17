import React, { Component } from 'react';
import './App.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RecipeContainer from '../RecipeContainer/RecipeContainer';

class App extends Component {
  render () {
    return (
      <div className="app">
        <Header />
        <RecipeContainer />
        <Footer />
      </div>
    );
  }
}

export default App;
