import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { addRankItem } from '../Services/LocalStorage';
import { resetState } from '../redux/actions';

class Feedback extends Component {
  handleClick = ({ target }) => {
    const { dispatch, name, score, history: { push } } = this.props;
    const storage = {
      name,
      score,
    };
    addRankItem(storage);
    if (target.name === 'Ranking') {
      push('/Ranking');
    } else {
      push('/');
      // window.location.reload(false);
      dispatch(resetState());
    }
  };

  messageChecker = () => {
    const { assertions } = this.props;
    const THREE = 3;
    if (assertions < THREE) return 'Could be better...';
    if (assertions >= THREE) return 'Well Done!';
  };

  render() {
    const { assertions, score } = this.props;
    return (
      <div data-testid="feedback-text">
        <Header />
        <h3 data-testid="feedback-text">{this.messageChecker()}</h3>
        <p>Número de acertos:</p>
        <p data-testid="feedback-total-question">
          { assertions }
        </p>
        <p>Pontuação:</p>
        <p data-testid="feedback-total-score">
          { score }
        </p>
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
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
