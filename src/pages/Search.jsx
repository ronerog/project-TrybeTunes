import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    isDisabled: true,
    name: '',
    carregando: false,
    playlist: [],
    show: false,
    showArtist: '',
  };

  handleInput = ({ target }) => {
    const { name, value } = target;
    const maxLength = 2;

    this.setState({
      [name]: value,
    });

    if (value.length >= maxLength) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  onClickButton = async () => {
    const { name } = this.state;
    this.setState({
      name: '',
      carregando: true,
    });
    const results = await searchAlbumsAPI(name);
    console.log(results);
    this.setState({
      playlist: results,
      carregando: false,
      show: true,
      showArtist: name,
    });
  };

  render() {
    const { isDisabled, name, carregando, show, showArtist, playlist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {carregando === true ? <Carregando />
          : (
            <form>
              <label htmlFor="name">
                <input
                  type="text"
                  data-testid="search-artist-input"
                  name="name"
                  value={ name }
                  onChange={ this.handleInput }
                />
              </label>
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ isDisabled }
                onClick={ this.onClickButton }
              >
                Pesquisar
              </button>
            </form>
          )}
        {show
        && (
          <h1>
            Resultado de álbuns de:
            {' '}
            {showArtist}
          </h1>)}

        {
          playlist.length === 0
            ? <h1>Nenhum álbum foi encontrado</h1>
            : (
              <div>
                <ul>
                  {
                    playlist.map((elemento) => (
                      <li key={ elemento.collectionId }>
                        <img src={ elemento.artworkUrl100 } alt="" />
                        <h1>{ elemento.artistName }</h1>
                        <h2>{ elemento.collectionName }</h2>
                        <Link
                          data-testid={ `link-to-album-${elemento.collectionId}` }
                          to={ `/album/${elemento.collectionId}` }
                        >
                          Saiba mais
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </div>
            )
        }
      </div>
    );
  }
}
