import React, { Component } from 'react';
import Categories from './categories'
import Post from './post'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Categories/>
        <hr/>
        <Post />
      </div>
    );
  }
}

export default App;
