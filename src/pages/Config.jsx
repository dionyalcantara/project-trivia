import React from 'react';

import '../styles/config.css'

class Config extends React.Component {
  render() {
    return (
      <main className='main-settings'>
        <div className='settings'>
          <h1 data-testid="settings-title">SETTINGS</h1>
          <p>{ `Under development :)` }</p>
        </div>
      </main>
    );
  }
}

export default Config;
