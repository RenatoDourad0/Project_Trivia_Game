import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, email, points } = this.props;
    const gravatar = md5(email).toString();
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${gravatar}` }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        <h4
          data-testid="header-player-name"
        >
          {name}
        </h4>
        <span
          data-testid="header-score"
        >
          {points}
        </span>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  points: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.loginReducer.name,
  email: state.loginReducer.email,
  points: state.player.score,
});

export default connect(mapStateToProps)(Header);
