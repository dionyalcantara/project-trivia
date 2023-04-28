import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { resetLogin, resetFetch } from '../redux/actions';

import '../styles/feedback.css';
import logo from '../trivia.png';

const MAX_ASSERTIONS = 3;

class Feedback extends React.Component {
  componentDidMount() {
    this.getPlayersFromLocalStorage();
  }

  getPlayersFromLocalStorage = () => {
    const { gravatarEmail, name, score } = this.props;

    const getPlayers = JSON.parse(localStorage.getItem('players')) || [];
    const infoPlayers = {
      gravatarEmail,
      name,
      score,
    };
    const updatedPlayers = [...getPlayers, infoPlayers];
    localStorage.setItem('players', JSON.stringify(updatedPlayers));
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    dispatch(resetLogin());
    dispatch(resetFetch());
    history.push('/');
  };

  render() {
    const { assertions, score, history } = this.props;
    return (
      <main className="main-feedback">
        <Header />
        <div className="info-feedback">
          <img
            className="profile-img"
            src={ logo }
            alt="logo trivia"
          />
          <div className="feed">
            <h3
              className="feedback-message"
              data-testid="feedback-text"
            >
              {assertions < MAX_ASSERTIONS
                ? 'Could be better...' : 'Well Done!'}
            </h3>
            <div className="result">
              <p>
                You answered
                {' '}
                <span data-testid="feedback-total-question">{ assertions }</span>
                {' '}
                questions correctly
              </p>
              <p>
                Your total score is
                {' '}
                <strong data-testid="feedback-total-score">{ score }</strong>
                {' '}
                points
              </p>
            </div>
          </div>
        </div>

        <div className="btns-feedback">
          <button
            className="btn-feed btn-play-again"
            data-testid="btn-play-again"
            onClick={ this.handleClick }
          >
            Play Again
          </button>
          <button
            className="btn-feed btn-ranking"
            data-testid="btn-ranking"
            onClick={ () => {
              history.push('/ranking');
            } }
          >
            Ranking
          </button>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

Feedback.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
