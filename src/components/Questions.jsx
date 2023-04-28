import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addScore, increaseAssertions } from '../redux/actions';

import '../styles/questions.css';

const INTERVAL = 1000;
const LAST_QUESTION = 4;
let actualPoints = 0;

class Questions extends React.Component {
  state = {
    indexQuestion: 0,
    questions: [],
    category: '',
    question: '',
    shuffledAnswers: [],
    isAnswered: false,
    answerTime: 30,
  };

  componentDidMount() {
    this.fetchApiQuestions();
    this.timer = setInterval(() => this.timerRun(), INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  shuffleArray = (answers) => {
    const shuffle = answers.reduce((acc, curr, indexAtual) => {
      const randomNumber = Math.floor(Math.random() * (indexAtual + 1));
      acc[indexAtual] = acc[randomNumber];
      acc[randomNumber] = curr;
      return acc;
    }, [...answers]);
    return shuffle;
  };

  organizeQuestion = () => {
    const { indexQuestion, questions } = this.state;
    const { category, question } = questions[indexQuestion];
    const answers = [
      {
        text: questions[indexQuestion].correct_answer,
        correctAnswer: true,
        difficulty: questions[indexQuestion].difficulty,
      },
      ...questions[indexQuestion].incorrect_answers.map((text) => ({
        text,
        correctAnswer: false,
        difficulty: questions[indexQuestion].difficulty,
      })),
    ];
    const shuffledAnswers = this.shuffleArray(answers);
    this.setState({
      category,
      question,
      shuffledAnswers,
    });
  };

  nextQuestion = () => {
    const { indexQuestion } = this.state;
    const { history } = this.props;

    if (indexQuestion === LAST_QUESTION) history.push('/feedback');

    this.setState({
      isAnswered: false,
    });
    this.setState((prevState) => ({
      indexQuestion: prevState.indexQuestion + 1,
      answerTime: 30,
    }), this.organizeQuestion);
  };

  fetchApiQuestions = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    this.setState({
      questions: data.results,
    }, this.organizeQuestion);
  };

  btnClick = () => {
    this.setState({
      isAnswered: true,
    });
  };

  timerRun = () => {
    this.setState((prevState) => ({
      answerTime: prevState.answerTime > 1 ? prevState.answerTime - 1 : 0,
    }));
  };

  render() {
    const { category, question, shuffledAnswers, isAnswered, answerTime } = this.state;
    const { dispatch } = this.props;

    let wrongAnswerIndex = 0;
    return (
      <>
        <section className="main-game">
          <div className="question-container">
            <h1 data-testid="question-category" className="category">{category}</h1>
            <h2
              className="question"
              dangerouslySetInnerHTML={ { __html: question } }
              data-testid="question-text"
            />
          </div>

          <div className="countdown-timer">
            <div className="countdown-timer__circle" />
            <div className="countdown-timer__block">
              <div className="countdown-timer__value">{answerTime}</div>
            </div>
          </div>

          <div data-testid="answer-options" className="answers">
            {
              shuffledAnswers.map(({ text, correctAnswer, difficulty }) => {
                const btnStyle = {
                  border: 'none',
                };
                if (isAnswered) {
                  btnStyle.border = correctAnswer ? (
                    btnStyle.border = '3px solid rgb(6, 240, 15)'
                  ) : btnStyle.border = '3px solid red';
                }
                const btnAnswer = (
                  <button
                    dangerouslySetInnerHTML={ { __html: text } }
                    className="answer-buttons"
                    key={ text }
                    style={ btnStyle }
                    type="button"
                    onClick={ () => {
                      this.btnClick();

                      const truePoints = 10;
                      const hard = 3;
                      let diff;

                      if (difficulty === 'easy') diff = 1;
                      if (difficulty === 'medium') diff = 2;
                      if (difficulty === 'hard') diff = hard;

                      if (correctAnswer !== false) {
                        actualPoints += truePoints + (answerTime * diff);
                        dispatch(increaseAssertions());
                      } else {
                        actualPoints = 0;
                      }
                      dispatch(addScore(actualPoints));
                    } }
                    data-testid={ correctAnswer
                      ? 'correct-answer' : `wrong-answer-${wrongAnswerIndex}` }
                    disabled={ answerTime === 0 }
                    aria-label="answer"
                  />
                );
                if (!correctAnswer) {
                  wrongAnswerIndex += 1;
                }
                return btnAnswer;
              })
            }
          </div>
        </section>
        <div>
          {isAnswered && (
            <button
              className="answer-buttons next-btn"
              data-testid="btn-next"
              onClick={ this.nextQuestion }
            >
              Next
            </button>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  player: {
    score: state.player.score,
  },
});

Questions.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  player: PropTypes.shape({
    score: PropTypes.number.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Questions);
