import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

export default class Login extends Component {
  state = {
    isDisabled: true,
    name: '',
    carregando: false,
    redirect: false,
  };

  handleInput = ({ target }) => {
    const { name, value } = target;
    const maxLength = 3;

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
    const { name: nome } = this.state;
    this.setState({
      carregando: true,
    });
    await createUser({
      name: nome,
    });
    this.setState({
      carregando: false,
      redirect: true,
    });
  };

  render() {
    const { isDisabled, name, carregando, redirect } = this.state;
    return (
      <div data-testid="page-login">
        {carregando ? <Carregando /> : (
          <form action="">
            <label htmlFor="name">
              <input
                data-testid="login-name-input"
                type="text"
                name="name"
                value={ name }
                onChange={ this.handleInput }
              />
            </label>
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ isDisabled }
              onClick={ this.onClickButton }
            >
              Entrar
            </button>
            {redirect && <Redirect to="/search" />}
          </form>
        )}
      </div>
    );
  }
}
