import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRankItems } from '../Services/LocalStorage';

class Ranking extends Component {
  handleClick = () => {
    const { history: { push } } = this.props;
    push('/');
    window.location.reload(false);
  };

  render() {
    const rankList = getRankItems();
    return (
      <div data-testid="Ranking-text">
        <h3 data-testid="ranking-title">Ranking</h3>
        { rankList.map((item, index) => (
          <div key={ index }>
            <h3 data-testid={ `player-score-${index}` }>{item.score}</h3>
            <h3 data-testid={ `player-name-${index}` }>{item.name}</h3>
          </div>
        )) }
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="btn-go-home"
        >
          Play Again
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Ranking);
