import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Header extends Component {
  render() {
    const { profileImage, name, currentScore } = this.props;

    return (
      <header>
        <div className="user-info">
          <img
            src={ profileImage }
            alt="profile"
            data-testid="header-profile-picture"
          />
          <h4 data-testid="header-player-name">{name}</h4>
        </div>
        <div className="scoring">
          <FontAwesomeIcon icon="fa-solid fa-star" />
          <h4 data-testid="header-score">{currentScore}</h4>
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
