import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../App.css';
import { timeOut } from '../redux/actions';
// nextQuestion

class Question extends Component {
  state = {
    isClicked: false,
    timer: 30,
    lockAnswers: [],
    interval: '',
  };

  componentDidMount() {
    const { question } = this.props;
    const half = 0.5;
    const minusOne = -1;
    this.setState({ lockAnswers: [{ correct_answer: question
      .correct_answer }, ...question.incorrect_answers]
      .sort(() => ((Math.random() > half) ? 1 : minusOne)) });
    this.gameTimer();
  }

  componentDidUpdate() {
    const { timer, interval } = this.state;
    const { dispatch } = this.props;
    if (timer === 0) {
      clearInterval(interval);
      dispatch(timeOut(true));
    }
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
    // const { dispatch } = this.props;
    // dispatch(nextQuestion());
    this.setState({ isClicked: true });
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
