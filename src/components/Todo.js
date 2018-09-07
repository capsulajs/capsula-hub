import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Todo extends Component {
  render() {
    return (
      <div>
        <h1>Todo</h1>
        <Link to="/">Go to home</Link>
      </div>
    );
  }
}

export default Todo;
