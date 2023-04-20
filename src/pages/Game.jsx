import React from 'react';
import { connect } from 'react-redux';

class Game extends React.Component {
  render() {
    return (
      <h2>Tela do jogo exemplo</h2>
    );
  }
}

export default connect()(Game);
