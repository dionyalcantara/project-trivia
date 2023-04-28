import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';
import { fetchTrivia, saveName, generateGravatar } from '../redux/actions';

import '../styles/login.css';
import logo from '../trivia.png';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = (event) => {
    const { dispatch } = this.props;
    const { email, name } = this.state;

    event.preventDefault();

    const convertedEmail = MD5(email).toString();

    dispatch(generateGravatar(convertedEmail));
    dispatch(saveName(name));
    dispatch(fetchTrivia());
  };

  render() {
    const { email, name } = this.state;
    const { fetchingComplete, history, playerName } = this.props;

    const isValid = name.length > 0 && email.length > 0;

    if (fetchingComplete && playerName !== '') return <Redirect to="/game" />;

    return (
      <main className="main-login">
        <img src={ logo } alt="logo-trivia" className="logo-trivia" />
        <form className="form">
          <input
            className="input-one"
            type="text"
            id="name-id"
            value={ name }
            onChange={ this.handleChange }
            name="name"
            data-testid="input-player-name"
            placeholder="What's your name?"
          />

          <input
            className="input-two"
            type="text"
            id="email-id"
            value={ email }
            onChange={ this.handleChange }
            name="email"
            data-testid="input-gravatar-email"
            placeholder="What's your e-mail?"
          />

          <div className="buttons-login">
            <button
              className="btn-login-one"
              type="submit"
              disabled={ !isValid }
              data-testid="btn-play"
              onClick={ this.handleClick }
            >
              Play
            </button>
            <button
              className="btn-login-two"
              data-testid="btn-settings"
              onClick={ () => {
                history.push('/config');
              } }
            >
              Settings
            </button>
          </div>
        </form>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  fetchingComplete: state.fetch.fetchingComplete,
  playerName: state.player.name,
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fetchingComplete: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  playerName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Login);
