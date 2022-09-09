import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { nextQuestion } from '../redux/actions';

class Question extends Component {
  handleRightClick = () => {
    const { dispatch } = this.props;
    dispatch(nextQuestion());
  };

  handleWrongClick = () => {
    const { dispatch } = this.props;
    dispatch(nextQuestion());
  };

  renderQuestionOptions = () => {
    const { question } = this.props;
    const correctAsw = (
      <button
        key="5"
        type="button"
        onClick={ this.handleRightClick }
        data-testid="correct-answer"
      >
        {question.correct_answer}
      </button>);
    const incorrectAsws = question.incorrect_answers.map((incorrectAsw, index) => (
      <button
        key={ index }
        type="button"
        onClick={ this.handleWrongClick }
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
    return (
      question
        ? (
          <section>
            <div>
              <h3 data-testid="question-category">{ question.category }</h3>
              <h3 data-testid="question-text">{ question.question }</h3>
            </div>
            <div data-testid="answer-options">
              { this.renderQuestionOptions() }
            </div>
          </section>
        )
        : <div />
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({

  }),
}.isRequired;

export default connect()(Question);
