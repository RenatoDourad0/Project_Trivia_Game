import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getQuestions } from '../redux/actions/index';
import Question from '../components/Question';

class Game extends React.Component {
  componentDidMount() {
    const { token, history: { push }, dispatch } = this.props;
    const localStorageToken = localStorage.getItem('token');
    if (localStorageToken === 'INVALID_TOKEN') {
      push('/');
      dispatch(getQuestions(token.token));
      return localStorage.removeItem('token');
    }
    dispatch(getQuestions(token.token));
  }

  render() {
    const { questions, currentQuestion } = this.props;
    const [one, two] = [1, 2];
    const three = 3;
    const four = 4;
    const five = 5;
    return (
      <div>
        <Header />
        { questions && currentQuestion === one
          && <Question question={ questions.results[0] } /> }
        { questions && currentQuestion === two
          && <Question question={ questions.results[1] } /> }
        { questions && currentQuestion === three
          && <Question question={ questions.results[2] } /> }
        { questions && currentQuestion === four
          && <Question question={ questions.results[3] } /> }
        { questions && currentQuestion === five
          && <Question question={ questions.results[4] } /> }

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  questions: state.loginReducer.questions,
  currentQuestion: state.loginReducer.currentQuestion,
});

Game.propTypes = {
  token: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  questions: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  currentQuestion: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Game);
