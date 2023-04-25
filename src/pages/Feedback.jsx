import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const MAX_ASSERTIONS = 3;

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <section>
        <Header />
        <h3 data-testid="feedback-text">
          {
            assertions < MAX_ASSERTIONS ? 'Could be better...' : 'Well Done!'
          }
        </h3>
        <p data-testid="feedback-total-score">
          {
            `Você acertou ${score} questões`
          }
        </p>
        <p data-testid="feedback-total-question">
          {
            `Um total de ${assertions} pontos`
          }
        </p>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
