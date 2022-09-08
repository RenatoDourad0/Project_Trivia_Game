import React, { Component } from 'react';

export class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  // handlePlay = () => {
  // };

  render() {
    const { name, email } = this.state;
    // const { history } = this.props;
    return (
      <form>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            name="name"
            id="name"
            value={ name }
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            id="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          type="button"
          disabled={ !name.length > 0 || !email.length > 0 }
          onClick={ this.handlePlay }
          data-testid="btn-play"
        >
          Play
        </button>
      </form>
    );
  }
}

export default Login;
