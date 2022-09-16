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
  decreaseTimer,
  restoreTimer,
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
    const { dispatch, decrease } = this.props;
    if (decrease === 0) {
      clearInterval(this.setTime);
      dispatch(timeOut(true));
    }
  }

  componentWillUnmount() {
    clearInterval(this.setTime);
  }

  gameTimer = () => {
    const { isClicked } = this.state;
    const { dispatch, decrease } = this.props;
    const ONE_SECOND = 1000;
    this.setTime = setInterval(() => {
      dispatch(decreaseTimer());
    }, ONE_SECOND);
    if (decrease === 0 || isClicked) clearInterval(this.setTime);
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
    clearInterval(this.setTime);
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
          className={ isClicked ? 'rightAnswer' : 'question-button' }
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
        className={ isClicked ? 'wrongAnswer' : 'question-button' }
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
    dispatch(restoreTimer());
    this.setState({ isClicked: false });
    clearInterval(this.setTime);
  };

  render() {
    const { question, timeStop, dispatch, decrease } = this.props;
    const { isClicked } = this.state;
    if (isClicked) dispatch(timeOut(true));
    return (
      question
        ? (
          <section>
            <div>
              <span>{decrease}</span>
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
                  className="next-button"
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
  decrease: state.gameReducer.decrease,
});

export default connect(mapStateToProps)(Question);
