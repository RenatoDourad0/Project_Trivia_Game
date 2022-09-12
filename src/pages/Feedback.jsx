import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { addRankItem } from '../Services/LocalStorage';

class Feedback extends Component {
  handleClick = ({ target }) => {
    const { name, score, history: { push } } = this.props;
    const storage = {
      name,
      score,
    };
    addRankItem(storage);
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

const mapStateToProps = (state) => ({
  name: state.loginReducer.name,
  score: state.player.score,
});

Feedback.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
