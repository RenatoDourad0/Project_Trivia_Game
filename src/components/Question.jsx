import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../App.css';
import { timeOut, nextQuestion } from '../redux/actions';

class Question extends Component {
  state = {
    isClicked: false,
    timer: 30,
    lockAnswers: [],
    interval: '',
  };

  componentDidMount() {
    const { question, dispatch } = this.props;
    const half = 0.5;
    const minusOne = -1;
    this.setState({ lockAnswers: [{ correct_answer: question
      .correct_answer }, ...question.incorrect_answers]
      .sort(() => ((Math.random() > half) ? 1 : minusOne)) });
    this.gameTimer();
    dispatch(timeOut(false));
  }

  componentDidUpdate() {
    const { timer, interval } = this.state;
    const { dispatch } = this.props;
    if (timer === 0) {
      clearInterval(interval);
      dispatch(timeOut(true));
    }
  }

  componentWillUnmount() {
    const { interval } = this.state;
    clearInterval(interval);
  }

  gameTimer = () => {
    const { timer } = this.state;
    const ONE_SECOND = 1000;
    if (timer > 0) {
      const interval = setInterval(() => this
        .setState((prevState) => ({ timer: prevState.timer - 1 })), ONE_SECOND);
      this.setState({ interval });
    }
    return timer;
  };

  handleClick = () => {
    this.setState({ isClicked: true });
  };

  handleNextClick = () => {
    const { dispatch, currentQuestion, history: { push } } = this.props;
    dispatch(nextQuestion());
    const five = 5;
    if (currentQuestion === five) {
      push('/feedback');
    }
  };

  render() {
    const { question, timeStop } = this.props;
    const { timer, lockAnswers, isClicked } = this.state;
    return (
      question
        ? (
          <section>
            <div>
              <span>{timer}</span>
              <h3 data-testid="question-category">{ question.category }</h3>
              <h3 data-testid="question-text">{ question.question }</h3>
            </div>
            <div data-testid="answer-options">
              { lockAnswers
                .map((item, index) => (
                  <button
                    type="button"
                    key={ index }
                    onClick={ this.handleClick }
                    disabled={ timeStop }
                    className={ isClicked && item.correct_answer
                      ? 'rightAnswer' : isClicked && 'wrongAnswer' }
                    data-testid={ item.correct_answer
                      ? 'correct-answer' : `wrong-answer-${index}` }
                  >
                    { item.correct_answer ? item.correct_answer : item }
                  </button>
                )) }
            </div>
            { isClicked || timeStop
              ? (
                <button
                  type="button"
                  onClick={ this.handleNextClick }
                  data-testid="btn-next"
                >
                  Próxima pergunta
                </button>
              )
              : '' }
          </section>
        )
        : <div />
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({}),
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  timeStop: state.gameReducer.timer,
  currentQuestion: state.gameReducer.currentQuestion,
});

export default connect(mapStateToProps)(Question);
