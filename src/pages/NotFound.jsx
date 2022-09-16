import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (
      <div>
        <h1>Not Found</h1>
        <br />
        <Link to="/Project_Trivia_Game">
          <button type="button" className="button">
            Ir para página inicial
          </button>
        </Link>
      </div>
    );
  }
}

export default NotFound;
