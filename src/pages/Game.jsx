import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends React.Component {
  componentDidMount() {
    this.verifyToken();
  }

  verifyToken = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    const invalidToken = 3;
    if (data.response_code === invalidToken) {
      const { history } = this.props;
      return history.push('/');
    }
  };

  render() {
    // esse history vai ser usado no req 10
    const { history } = this.props;
    return (
      <main>
        <Header />
        <Questions history={ history } />
      </main>
    );
  }
}

Game.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Game);
