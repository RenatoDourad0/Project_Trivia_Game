import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { callApi, getInfo } from '../redux/actions';

class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handlePlay = async () => {
    const { dispatch, history: { push } } = this.props;
    const { name, email } = this.state;
    dispatch(getInfo({ name, email }));
    await dispatch(callApi());
    push('/game');
  };

  render() {
    const { name, email } = this.state;
    const { history: { push } } = this.props;
    return (
      <form className="login-form">
        <label htmlFor="name">
          Nome:
          <br />
          <input
            type="text"
            name="name"
            id="name"
            className="login-input"
            value={ name }
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          Email:
          <br />
          <input
            type="email"
            name="email"
            id="email"
            className="login-input"
            value={ email }
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          type="button"
          disabled={ !name.length > 0 || !email.length > 0 }
          onClick={ this.handlePlay }
          className="login-button play-button"
          data-testid="btn-play"
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => push('/settings') }
          className="login-button"
        >
          Settings
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
