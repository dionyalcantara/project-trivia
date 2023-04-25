import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addScore } from '../redux/actions';

const INTERVAL = 1000;
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
      <section>
        <h1 data-testid="question-category">{category}</h1>
        <h2 data-testid="question-text">{question}</h2>
        <span>{`Tempo: ${answerTime}`}</span>
        <div data-testid="answer-options">
          {
            shuffledAnswers.map(({ text, correctAnswer, difficulty }) => {
              const btnStyle = {
                border: '3px solid',
              };
              if (isAnswered) {
                btnStyle.border += correctAnswer ? ' rgb(6, 240, 15)' : ' red';
              }
              const btnAnswer = (
                <button
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
                    } else {
                      actualPoints = 0;
                    }
                    dispatch(addScore(actualPoints));
                  } }
                  data-testid={ correctAnswer
                    ? 'correct-answer' : `wrong-answer-${wrongAnswerIndex}` }
                  disabled={ answerTime === 0 }
                >
                  {text}
                </button>
              );
              if (!correctAnswer) {
                wrongAnswerIndex += 1;
              }
              return btnAnswer;
            })
          }
          {isAnswered && (
            <button
              data-testid="btn-next"
              onClick={ this.nextQuestion }
            >
              Next
            </button>
          )}
        </div>
      </section>
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
