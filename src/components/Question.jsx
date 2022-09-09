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
    interval: '',
  };

  componentDidMount() {
    const { question } = this.props;
    const half = 0.5;
    const minusOne = -1;
    this.setState({ lockQuestions: [question
      .correct_answer, ...question.incorrect_answers]
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
    this.setState({ isClicked: true });
  };

  render() {
    const { question, timeStop } = this.props;
    const { timer, lockQuestions, isClicked } = this.state;
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
              { lockQuestions.map((item, index) => (
                <div key={ index }>
                  {/* {console.log(item)} */}
                  {console.log(lockQuestions)}
                  <button
                    type="button"
                    onClick={ this.handleClick }
                    disabled={ timeStop }
                    className={ isClicked ? 'rightAnswer' : '' }
                    data-testid="correct-answer"
                  >
                    {item.correct_answer}
                  </button>
                  <button
                    type="button"
                    onClick={ this.handleClick }
                    disabled={ timeStop }
                    className={ isClicked ? 'wrongAnswer' : '' }
                    data-testid={ `wrong-answer-${index}` }
                  >
                    { item.incorrect_answers }
                  </button>
                </div>
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
