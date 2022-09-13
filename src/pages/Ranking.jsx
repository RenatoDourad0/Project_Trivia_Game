import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRankItems } from '../Services/LocalStorage';
import { resetState } from '../redux/actions';

class Ranking extends Component {
  handleClick = () => {
    const { dispatch } = this.props;
    // window.location.reload(false); Hackerzinho do Jensen
    dispatch(resetState());
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
        <Link to="/">
          <button
            type="button"
            onClick={ this.handleClick }
            data-testid="btn-go-home"
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
