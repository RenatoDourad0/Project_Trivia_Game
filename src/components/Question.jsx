import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../App.css';
import { decode } from 'html-entities';
import { timeOut, nextQuestion, pointsTotal } from '../redux/actions';

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

  handleClick = ({ target }) => { // req 9
    this.setState({ isClicked: true });
    const { timer, interval } = this.state;
    const { question, dispatch } = this.props;
    const POINTS_CONST = 10;
    const POINTS_HIGH = 3;
    let difficultPoints = 1;
    if (question.difficulty === 'medium') difficultPoints = 2;
    if (question.difficulty === 'hard') difficultPoints = POINTS_HIGH;
    if (target.name === question
      .correct_answer) dispatch(pointsTotal(POINTS_CONST + (timer * difficultPoints)));
    dispatch(timeOut(true));
    clearInterval(interval);
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
    const { timer, lockAnswers, isClicked } = this.state;
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
              { lockAnswers
                .map((item, index) => (
                  item.correct_answer === question.correct_answer ? (
                    <button
                      key={ index }
                      name={ item.correct_answer }
                      type="button"
                      onClick={ this.handleClick }
                      disabled={ timeStop }
                      className={ isClicked ? 'rightAnswer' : 'didMount' }
                      data-testid="correct-answer"
                    >
                      { decode(item.correct_answer) ? decode(item
                        .correct_answer) : decode(item) }
                    </button>
                  ) : (
                    <button
                      key={ index }
                      type="button"
                      onClick={ this.handleClick }
                      disabled={ timeStop }
                      className={ isClicked ? 'wrongAnswer' : 'didMount' }
                      data-testid={ `wrong-answer-${index}` }
                    >
                      { decode(item.correct_answer) ? decode(item
                        .correct_answer) : decode(item) }
                    </button>
                  )
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
