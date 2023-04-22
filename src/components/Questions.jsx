import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  state = {
    indexQuestion: 0,
    questions: [],
    category: '',
    question: '',
    shuffledAnswers: [],
  };

  componentDidMount() {
    this.fetchApiQuestions();
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

  fetchApiQuestions = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    this.setState({
      questions: data.results,
    }, this.organizeQuestion);
  };

  render() {
    const { category, question, shuffledAnswers } = this.state;
    let wrongAnswerIndex = 0;
    return (
      <section>
        <h1 data-testid="question-category">{category}</h1>
        <h2 data-testid="question-text">{question}</h2>
        <div data-testid="answer-options">
          {
            shuffledAnswers.map(({ text, correctAnswer }) => {
              const btnAnswer = (
                <button
                  key={ text }
                  type="button"
                  data-testid={ correctAnswer
                    ? 'correct-answer' : `wrong-answer-${wrongAnswerIndex}` }
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
