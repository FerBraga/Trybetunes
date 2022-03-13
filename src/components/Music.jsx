import React from 'react';
import PropTypes from 'prop-types';

class Music extends React.Component {
  render() {
    const { previewUrl, trackName } = this.props;

    return (
      <div>
        <div>
          <p>{trackName}</p>
        </div>

        <div>
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
        </div>
      </div>
    );
  }
}

Music.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default Music;
