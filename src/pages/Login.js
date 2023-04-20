import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';
import { fetchTrivia, generateGravatar, saveName } from '../redux/actions';

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
    const { fetchingComplete, history } = this.props;

    const isValid = name.length > 0 && email.length > 0;

    if (fetchingComplete) return <Redirect to="/game" />;

    return (
      <main>
        <form>
          <label htmlFor="name-id">Nome</label>
          <input
            type="text"
            id="name-id"
            value={ name }
            onChange={ this.handleChange }
            name="name"
            data-testid="input-player-name"
          />

          <label htmlFor="email-id">Email</label>
          <input
            type="text"
            id="email-id"
            value={ email }
            onChange={ this.handleChange }
            name="email"
            data-testid="input-gravatar-email"
          />

          <button
            type="submit"
            disabled={ !isValid }
            data-testid="btn-play"
            onClick={ this.handleClick }
          >
            Play
          </button>
          <button
            data-testid="btn-settings"
            onClick={ () => {
              history.push('/config');
            } }
          >
            Configurações
          </button>
        </form>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  fetchingComplete: state.player.fetchingComplete,
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fetchingComplete: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Login);
