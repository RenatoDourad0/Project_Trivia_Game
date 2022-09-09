import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../App.css';
import { timeOut } from '../redux/actions';
// import { nextQuestion } from '../redux/actions';

class Question extends Component {
  state = {
    isClicked: false,
    timer: 6,
    lockQuestions: [],
  };

  componentDidMount() {
    this.setState({ lockQuestions: this.renderQuestionOptions() });
  }

  gameTimer = () => {
    const { timer } = this.state;
    const { dispatch } = this.props;
    const ONE_SECOND = 1000;
    if (timer > 0) {
      setTimeout(() => this
        .setState((prevState) => ({ timer: prevState.timer - 1 })), ONE_SECOND);
    } if (timer === 0) {
      dispatch(timeOut(true));
    }
    return timer;
  };

  handleClick = () => {
    this.setState({ isClicked: true });
  };

  renderQuestionOptions = () => {
    const { question, timeStop } = this.props;
    const { isClicked } = this.state;
    const correctAsw = (
      <button
        key="5"
        type="button"
        onClick={ this.handleClick }
        disabled={ timeStop }
        className={ isClicked ? 'rightAnswer' : '' }
        data-testid="correct-answer"
      >
        {question.correct_answer}
      </button>);
    const incorrectAsws = question.incorrect_answers.map((incorrectAsw, index) => (
      <button
        key={ index }
        type="button"
        onClick={ this.handleClick }
        disabled={ timeStop }
        className={ isClicked ? 'wrongAnswer' : '' }
        data-testid={ `wrong-answer-${index}` }
      >
        { incorrectAsw }
      </button>
    ));
    const half = 0.5;
    const minusOne = -1;
    const options = [correctAsw, ...incorrectAsws]
      .sort(() => ((Math.random() > half) ? 1 : minusOne));
    return options;
  };

  render() {
    const { question } = this.props;
    const { timer, lockQuestions } = this.state;
    this.gameTimer();
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
              { lockQuestions }
            </div>
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
});

export default connect(mapStateToProps)(Question);
