import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { callApi } from '../redux/actions';

class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, email } = this.state;
    const { dispatch, history: { push } } = this.props;
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
          onClick={ async () => {
            await dispatch(callApi());
            push('/game');
          } }
          data-testid="btn-play"
        >
          Play
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
