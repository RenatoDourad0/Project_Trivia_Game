import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getQuestions } from '../redux/actions/index';
import Question from '../components/Question';
import { getToken, removeToken } from '../Services/LocalStorage';
import Loading from '../components/Loading';

class Game extends React.Component {
  componentDidMount() {
    const { token, history: { push }, dispatch } = this.props;
    const localStorageToken = getToken();
    if (localStorageToken !== token.token) {
      console.log(localStorageToken, token);
      push('/Project_Trivia_Game');
      dispatch(getQuestions(token.token));
      return removeToken();
    }
    dispatch(getQuestions(token.token));
  }

  render() {
    const { loading, questions, currentQuestion, history } = this.props;
    const [one, two] = [1, 2];
    const three = 3;
    const four = 4;
    const five = 5;
    return (
      <div className="game-container">
        <Header />
        { loading && <Loading /> }
        { questions && currentQuestion === one
          && <Question question={ questions.results[0] } history={ history } /> }
        { questions && currentQuestion === two
          && <Question question={ questions.results[1] } history={ history } /> }
        { questions && currentQuestion === three
          && <Question question={ questions.results[2] } history={ history } /> }
        { questions && currentQuestion === four
          && <Question question={ questions.results[3] } history={ history } /> }
        { questions && currentQuestion === five
          && <Question question={ questions.results[4] } history={ history } /> }

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  questions: state.gameReducer.questions,
  currentQuestion: state.gameReducer.currentQuestion,
  loading: state.gameReducer.loading,
});

Game.propTypes = {
  token: PropTypes.shape({
    token: PropTypes.string,
  }),
  history: PropTypes.shape({ push: PropTypes.func }),
  questions: PropTypes.shape({
    results: PropTypes.objectOf(PropTypes.shape({})),
  }),
  dispatch: PropTypes.func,
  currentQuestion: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Game);
