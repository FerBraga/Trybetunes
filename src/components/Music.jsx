import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class Music extends React.Component {
  constructor() {
    super();

    this.state = ({
      isChecked: false,
      isLoading: false,
    });
  }

  checkedFavorite = async ({ target }) => {
    const { trackId } = this.props;
    // const { isChecked, isLoading } = this.state;

    const valueChecked = target.checked;
    this.setState({
      isChecked: valueChecked,
      isLoading: true,
    });
    await addSong(trackId);
    this.setState({
      isLoading: false,
    });
    await addSong();
  }

  render() {
    // const { previewUrl, trackName } = this.props;
    const { trackName, previewUrl, trackId } = this.props;
    const { isChecked, isLoading } = this.state;

    return (
      <div>
        <div>
          <p>{ trackName }</p>
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
        {isLoading ? <Loading />
          : (
            <label htmlFor={ trackId }>
              Favorita
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                id={ trackId }
                checked={ isChecked }
                onChange={ this.checkedFavorite }
              />
            </label>
          )}
      </div>
    );
  }
}

Music.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default Music;
