import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { resetLogin, resetFetch } from '../redux/actions';

const MAX_ASSERTIONS = 3;

class Feedback extends React.Component {
  handleClick = () => {
    const { dispatch, history } = this.props;
    dispatch(resetLogin());
    dispatch(resetFetch());
    history.push('/');
  };

  render() {
    const { assertions, score, history } = this.props;
    return (
      <section>
        <Header />
        <h3 data-testid="feedback-text">
          {assertions < MAX_ASSERTIONS
            ? 'Could be better...' : 'Well Done!'}
        </h3>
        <p>
          Você acertou
          {' '}
          <span data-testid="feedback-total-question">
            { assertions }
          </span>
          {' '}
          questões
        </p>
        <p>
          Um total de
          {' '}
          <span data-testid="feedback-total-score">
            { score }
          </span>
          {' '}
          pontos
        </p>

        <button
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Play Again
        </button>

        <button
          data-testid="btn-ranking"
          onClick={ () => {
            history.push('/ranking');
          } }
        >
          Ranking
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
