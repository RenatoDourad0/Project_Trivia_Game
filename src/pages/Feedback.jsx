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

  messageChecker = () => {
    const { assertions } = this.props;
    const THREE = 3;
    if (assertions < THREE) return 'Could be better...';
    if (assertions >= THREE) return 'Well Done!';
  };

  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
        <h3 data-testid="feedback-text">{this.messageChecker()}</h3>
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

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
