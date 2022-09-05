import React, { Component } from 'react';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    listaMusica: [],
    favorites: [],
    carregando: false,
  }

async componentDidMount() {
  await this.favoritar();
  const { match: { params: { id } } } = this.props;

  const musicas = await getMusics(id);

  this.setState({
    listaMusica: musicas
  })
}

favorinteds = async (element) => {
  const { favorites } = this.state;
  const favMusic = favorites.some((e) => e.trackName === element.trackName);
  if (favMusic) {
    this.setState({
      carregando: true,
    }, async () => {
      await removeSong(element);
      await this.favoritar();
      this.setState({
        carregando: false,
      });
    })
  } else {
    this.setState({
      carregando: true,
    }, async () => {
      await addSong(element);
      await this.favoritar();
      this.setState({
        carregando: false,
      })
    })
  }
}

favoritar = async () => {
  const favoritadas = await getFavoriteSongs();
  this.setState({
    favorites: favoritadas,
  })
}
  render() {
    const { listaMusica, favorites, carregando } = this.state;  
    return (
      <div data-testid="page-album">
        <Header />
        {listaMusica.length > 0 
        ? (
          <div>
            <img src={listaMusica[0]} alt={listaMusica[0].collectionName} />
            <p data-testid="artist-name">{ listaMusica[0].artistName }</p>
            <p data-testid="album-name">{ listaMusica[0].collectionName }</p>
          </div>)
        : <h1> Musicas não encontradas </h1>}
        <div>
          { carregando ? <Carregando /> : listaMusica.map((e, i) => (i > 0 && (
            <div key={ e.trackId }>
              <MusicCard 
              key={ e.trackNumber }
              trackName={ e.trackName }
              previewUrl={ e.previewUrl }
              />
              <label htmlFor={ i }>
                Favorita
                <input type="checkbox"
                id={ i }
                onClick={ async () => {
                  await this.favorinteds(e);
                  await this.favoritar();
                } }
                data-testid={ `checkbox-music-${e.trackId}` }
                defaultChecked={ favorites.length > 0 && (
                  favorites.some((elemento) => elemento.trackName === e.trackName)
                ) }
                />
              </label>
            </div>
          )))}
        </div>
      </div>
    );
  }
}
