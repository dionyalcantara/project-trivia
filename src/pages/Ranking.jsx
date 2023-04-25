import gravatar from 'gravatar';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetLogin } from '../redux/actions';

class Ranking extends React.Component {
  state = {
    players: [],
  };

  componentDidMount() {
    const players = JSON.parse(localStorage.getItem('players')) || [];
    players.sort((a, b) => b.score - a.score);
    this.setState({ players });
  }

  render() {
    const { history, dispatch } = this.props;
    const { players } = this.state;

    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          {players.map((player, index) => (
            <li key={ player.email }>
              <img src={ gravatar.url(player.email) } alt={ player.name } />
              <div data-testid={ `player-name-${index}` }>{player.name}</div>
              <div data-testid={ `player-score-${index}` }>{player.score}</div>
            </li>
          ))}
        </ol>
        <button
          data-testid="btn-go-home"
          onClick={ async () => {
            await dispatch(resetLogin());
            history.push('/');
          } }
        >
          Inicio
        </button>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Ranking);
