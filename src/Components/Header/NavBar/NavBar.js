import React, { Component } from 'react';
import './NavBar.scss';

class NavBar extends Component {
  render () {
    return (
      <nav className="nav">
        <h2 className="app-title">
          <a href="/">Recipe Box</a>
        </h2>
      </nav>
    );
  }
}

export default NavBar;
