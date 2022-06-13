import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Music from '../components/Music';
import musicsAPI from '../services/musicsAPI';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      albumName: '',
      tracks: [],
      tracksFav: [],
      isloading: false,
    };
  }

  componentDidMount() {
    this.artistSongs();
    this.favoriteSongs();
  }

  artistSongs = async () => {
    const { match: { params: { id } } } = this.props;

    const albumInfo = await musicsAPI(id);
    console.log(albumInfo);
    const tracks = albumInfo.slice(1);

    this.setState({
      artist: albumInfo[0].artistName,
      albumName: albumInfo[0].collectionName,
      tracks,
    });
  }

  favoriteSongs = async () => {
    this.setState({
      isloading: true,
    });
    const favorites = await getFavoriteSongs();
    this.setState({
      tracksFav: favorites,
      isloading: false,
    });
  }

  render() {
    const { artist, albumName, tracks, isloading, tracksFav } = this.state;
    console.log(tracksFav);
    return (
      <div>
        <Header />
        {isloading ? <Loading />
          : (
            <div data-testid="page-album" className="pageAlbum">
              <div className="divInfoMusic">
                <h2 data-testid="artist-name" id="titleH2Musics">{artist}</h2>
                <p data-testid="album-name" id="paragraphMusics">{albumName}</p>
              </div>
              <p>Album</p>
              <div className="divMusics">
                {tracks.map(({ trackId, trackName, previewUrl }) => (
                  <div key={ trackId } className="listMusics">
                    <Music
                      trackName={ trackName }
                      previewUrl={ previewUrl }
                      trackId={ trackId }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
