import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Music from '../components/Music';
import musicsAPI from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      albumName: '',
      tracks: [],
    };
  }

  componentDidMount() {
    this.artistSongs();
  }

  artistSongs = async () => {
    console.log('Função chamada');
    const { match: { params: { id } } } = this.props;
    console.log(id);

    const albumInfo = await musicsAPI(id);
    const tracks = albumInfo.slice(1);
    console.log(albumInfo[0].collectionName);
    console.log(tracks);

    this.setState({
      artist: albumInfo[0].artistName,
      albumName: albumInfo[0].collectionName,
      tracks,
    });
  }

  render() {
    const { artist, albumName, tracks } = this.state;
    return (
      <div>
        <div data-testid="page-album">
          <Header />
          <p>Album</p>
          <div className="divInfoMusic">
            <h2 data-testid="artist-name" id="titleH2Musics">{artist}</h2>
            <p data-testid="album-name" id="paragraphMusics">{albumName}</p>
          </div>

          <div className="divMusics">
            {tracks.map(({ trackId, trackName, previewUrl }) => (
              <div key={ trackId } className="listMusics">
                <Music
                  trackName={ trackName }
                  previewUrl={ previewUrl }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
};

export default Album;
