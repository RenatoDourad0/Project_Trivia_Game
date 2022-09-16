import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRankItems } from '../Services/LocalStorage';
import { resetState } from '../redux/actions';

class Ranking extends Component {
  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(resetState());
  };

  render() {
    const rankList = getRankItems();
    return (
      <div data-testid="Ranking-text" className="ranking-container">
        <h1 data-testid="ranking-title">Ranking</h1>
        { rankList.map((item, index) => (
          <div key={ index }>
            <h3 data-testid={ `player-name-${index}` }>{item.name}</h3>
            <h3 data-testid={ `player-score-${index}` }>{item.score}</h3>
          </div>
        )) }
        <Link to="/Project_Trivia_Game">
          <button
            type="button"
            onClick={ this.handleClick }
            data-testid="btn-go-home"
            className="button"
          >
            Play Again
          </button>
        </Link>
      </div>
    );
  }
}

Ranking.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Ranking);
