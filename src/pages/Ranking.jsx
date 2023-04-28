import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { resetLogin } from '../redux/actions';

import '../styles/ranking.css';
import logo from '../trivia.png';

class Ranking extends React.Component {
  state = {
    players: [],
  };

  componentDidMount() {
    const players = JSON.parse(localStorage.getItem('players')) || [];
    const sortPlayers = players.sort((a, b) => b.score - a.score);
    this.setState({ players: sortPlayers });
  }

  render() {
    const { history, dispatch } = this.props;
    const { players } = this.state;

    return (
      <main className="main-ranking">
        <div className="ranking">
          <img className="logo-ranking" src={ logo } alt="logo trivia" />
          <h1
            className="ranking-title"
            data-testid="ranking-title"
          >
            Ranking
          </h1>
          <ol>
            {players.map((player, index) => (
              <li key={ `player-name-${index}` }>
                <img
                  className="gravatar-ranking"
                  src={ player.gravatarEmail }
                  alt={ player.name }
                />
                <div data-testid={ `player-name-${index}` }>{player.name}</div>
                <div className="score-ranking">
                  <FontAwesomeIcon icon={ faStar } className="star-icon" />
                  <div data-testid={ `player-score-${index}` }>
                    {`${player.score} points`}
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <button
            className="btn-reset"
            data-testid="btn-go-home"
            onClick={ async () => {
              await dispatch(resetLogin());
              history.push('/');
            } }
          >
            Play Again
          </button>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
});

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Ranking);
