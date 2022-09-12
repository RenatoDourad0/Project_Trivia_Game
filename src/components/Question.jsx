import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../App.css';
import { decode } from 'html-entities';
import {
  timeOut,
  nextQuestion,
  pointsTotal,
  checkCorrectAnswers,
} from '../redux/actions';

class Question extends Component {
  state = {
    isClicked: false,
    timer: 30,
    lockAnswers: [],
    correctAnswers: 0,
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
    const { timer } = this.state;
    const { dispatch } = this.props;
    if (timer === 0) {
      clearTimeout(this.setTime);
      dispatch(timeOut(true));
    }
  }

  componentWillUnmount() {
    clearTimeout(this.setTime);
  }

  gameTimer = () => {
    const { timer, isClicked } = this.state;
    const ONE_SECOND = 1000;
    this.setTime = setTimeout(() => {
      this.setState({ timer: timer - 1 });
    }, ONE_SECOND);
    if (timer === 0 || isClicked) clearTimeout(this.setTime);
  };

  handleClick = (correct) => {
    this.setState({ isClicked: true });
    const { timer, correctAnswers } = this.state;
    const { question, dispatch } = this.props;
    const POINTS_CONST = 10;
    const POINTS_HIGH = 3;
    let difficultPoints = 1;
    if (question.difficulty === 'medium') difficultPoints = 2;
    if (question.difficulty === 'hard') difficultPoints = POINTS_HIGH;
    if (correct) dispatch(pointsTotal(POINTS_CONST + (timer * difficultPoints)));
    if (correct) {
      dispatch(checkCorrectAnswers(correctAnswers + 1));
    }
    dispatch(timeOut(true));
    clearTimeout(this.setTime);
  };

  generateAnswer = (answer, type, index) => {
    const { isClicked } = this.state;
    const { timeStop } = this.props;
    if (type === 'correct') {
      return (
        <button
          type="button"
          key={ index }
          onClick={ () => this.handleClick('true') }
          disabled={ timeStop }
          className={ isClicked ? 'rightAnswer' : '' }
          data-testid="correct-answer"
        >
          { decode(answer) }
        </button>
      );
    }
    return (
      <button
        type="button"
        key={ index }
        onClick={ () => this.handleClick() }
        disabled={ timeStop }
        className={ isClicked ? 'wrongAnswer' : '' }
        data-testid={ `wrong-answer-${index}` }
      >
        { decode(answer) }
      </button>
    );
  };

  buttonRender = () => {
    const { lockAnswers } = this.state;
    const { question } = this.props;
    const emptyArray = [];
    lockAnswers.forEach((item, index) => {
      if (item.correct_answer === question.correct_answer) {
        emptyArray.push(this.generateAnswer(item.correct_answer, 'correct', index));
      } else {
        emptyArray.push(this.generateAnswer(item, 'wrong', index));
      }
    });
    return emptyArray;
  };

  handleNextClick = () => {
    const { dispatch, currentQuestion, history: { push } } = this.props;
    dispatch(nextQuestion());
    const five = 5;
    if (currentQuestion === five) {
      push('/feedback');
    }
    this.setState({ timer: 0 });
  };

  render() {
    const { question, timeStop } = this.props;
    const { timer, isClicked } = this.state;
    if (timer !== 0) this.gameTimer();
    return (
      question
        ? (
          <section>
            <div>
              <span>{timer}</span>
              <h3 data-testid="question-category">{ question.category }</h3>
              <h3 data-testid="question-text">{ decode(question.question) }</h3>
            </div>
            <div data-testid="answer-options">
              {this.buttonRender()}
            </div>
            { (isClicked || timeStop)
              && (
                <button
                  type="button"
                  onClick={ this.handleNextClick }
                  data-testid="btn-next"
                >
                  Próxima pergunta
                </button>
              ) }
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
