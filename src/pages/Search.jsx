import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    isDisabled: true,
    name: '',
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

  render() {
    const { isDisabled, name } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
