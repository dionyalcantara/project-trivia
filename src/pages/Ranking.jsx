import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetLogin } from '../redux/actions';

class Ranking extends React.Component {
  render() {
    const { history, dispatch } = this.props;

    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>
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
