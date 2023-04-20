// importações
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../styles/header.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faStar } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
  render() {
    const { profileImage, name, currentScore } = this.props;

    return (
      <header>
        <div className="user-info">
          { profileImage ? <img
            src={ profileImage }
            alt="profile"
            data-testid="header-profile-picture"
          /> : (
            <FontAwesomeIcon icon={ faCircleUser } className="user-pic" />
          )}
          <h5 data-testid="header-player-name">{`Nome ${name}`}</h5>
        </div>
        <div className="scoring">
          <FontAwesomeIcon icon={ faStar } className="star-icon" />
          <h5 data-testid="header-score">{`Score: ${currentScore}`}</h5>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  profileImage: PropTypes.string,
  name: PropTypes.string,
  currentScore: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  profileImage: player.gravatarEmail,
  name: player.name,
  currentScore: player.score,
});

export default connect(mapStateToProps)(Header);
