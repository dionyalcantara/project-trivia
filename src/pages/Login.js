import React from 'react';
import { connect } from 'react-redux';

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

    const isValid = name.length > 0 && email.length > 0;

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
          >
            Play
          </button>
        </form>
      </main>
    );
  }
}

export default connect()(Login);
