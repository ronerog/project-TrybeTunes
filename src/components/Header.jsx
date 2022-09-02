import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

export default class Header extends Component {
  state = {
    nome: '',
    carregando: true,
  };

  async componentDidMount() {
    const name = await getUser();

    this.setState({
      nome: name,
      carregando: false,
    });
  }

  render() {
    const { nome: { name }, carregando } = this.state;
    return (
      <header data-testid="header-component">
        {
          carregando ? <Carregando />
            : (
              <span data-testid="header-user-name">{ name }</span>
            )
        }
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}
