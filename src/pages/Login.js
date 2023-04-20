import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchTrivia } from '../redux/actions';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, name } = this.state;
    const { dispatch, fetchingComplete, history } = this.props;

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
            onClick={ (e) => {
              e.preventDefault();
              dispatch(fetchTrivia());
            } }
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
  fetchingComplete: state.fetchingComplete,
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fetchingComplete: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Login);
