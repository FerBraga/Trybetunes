import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isBtnDisable: true,
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

  buttonC = () => {
    console.log('Clicou');
  }

  render() {
    const { name, isBtnDisable } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <Header />
          <p>Search</p>
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
            onClick={ this.buttonC }
          >
            Pesquisar
          </button>
        </div>
      </>
    );
  }
}

export default Search;
