import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      artistName: '',
      isBtnDisable: true,
      loading: false,
      searchArtist: [],
    };
  }

  validation = () => {
    const Min = 2;
    const { name } = this.state;
    const artist = name.length >= Min;

    if (artist) {
      this.setState({ isBtnDisable: false });
    } else {
      this.setState({ isBtnDisable: true });
    }
  }

  input = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState({
      [name]: value,
    }, this.validation);
  }

  buttonClick = async () => {
    const { name } = this.state;
    this.setState({
      name: '',
      loading: true,
      artistName: name,
    });
    const albumArtist = (await searchAlbumsAPI(name));
    this.setState({
      searchArtist: albumArtist,
      loading: false,
    });
  }

  render() {
    const {
      name,
      isBtnDisable,
      loading,
      searchArtist,
      artistName,
    } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-search">
          <div>
            <input
              type="text"
              className="inputSearch"
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
              name="name"
              value={ name }
              onChange={ this.input }
            />
            <button
              type="button"
              className="btnSearch"
              data-testid="search-artist-button"
              disabled={ isBtnDisable }
              onClick={ this.buttonClick }
            >
              Pesquisar
            </button>
          </div>

          <div>
            <p>{`Resultado de álbuns de: ${artistName}`}</p>
          </div>
          <div>
            {loading ? <Loading /> : ''}
          </div>
          <div>
            {searchArtist.length === 0
              ? 'Nenhum álbum foi encontrado'
              : (
                <ul>
                  {searchArtist.map((artist) => (
                    <li key={ artist.collectionId }>
                      <Link
                        to={ `/album/${artist.collectionId}` }
                        data-testid={ `link-to-album-${artist.collectionId}` }
                      >
                        {artist.collectionName}

                      </Link>
                    </li>))}
                </ul>
              )}
          </div>
        </div>
      </>
    );
  }
}

export default Search;
