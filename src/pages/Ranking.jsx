import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Ranking extends Component {
  handleClick = () => {
    const { history: { push } } = this.props;
    push('/');
    window.location.reload(false);
  };

  render() {
    return (
      <div data-testid="Ranking-text">
        <Header />
        <h3 data-testid="ranking-title">Ranking</h3>
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
