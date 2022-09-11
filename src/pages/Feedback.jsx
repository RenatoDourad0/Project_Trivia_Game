import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  handleClick = ({ target }) => {
    const { history: { push } } = this.props;
    if (target.name === 'Ranking') {
      push('/Ranking');
    } else {
      push('/');
      window.location.reload(false);
    }
  };

  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="btn-play-again"
        >
          Play Again
        </button>
        <button
          name="Ranking"
          type="button"
          onClick={ this.handleClick }
          data-testid="btn-ranking"
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Feedback);
