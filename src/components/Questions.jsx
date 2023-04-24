import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const INTERVAL = 1000;
const LAST_QUESTION = 4;

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

  // ao clicar no botão de próxima pergunta, criar uma função que faz um setState
  // para incrementar +1 no indexQuestion e chamar a organizeQuestion como segundo
  // parâmetro do setState
  organizeQuestion = () => {
    const { indexQuestion, questions } = this.state;
    const { category, question } = questions[indexQuestion];
    const answers = [
      {
        text: questions[indexQuestion].correct_answer,
        correctAnswer: true,
      },
      ...questions[indexQuestion].incorrect_answers.map((text) => ({
        text,
        correctAnswer: false,
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
    let wrongAnswerIndex = 0;
    return (
      <section>
        <h1 data-testid="question-category">{category}</h1>
        <h2 data-testid="question-text">{question}</h2>
        <span>{`Tempo: ${answerTime}`}</span>
        <div data-testid="answer-options">
          {
            shuffledAnswers.map(({ text, correctAnswer }) => {
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
                  onClick={ this.btnClick }
                  data-testid={ correctAnswer
                    ? 'correct-answer' : `wrong-answer-${wrongAnswerIndex}` }
                  disabled={ answerTime === 0 }
                >
                  { text }
                </button>
              );
              if (!correctAnswer) {
                wrongAnswerIndex += 1;
              }
              return btnAnswer;
            })
          }
          { isAnswered && (
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

Questions.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Questions);
