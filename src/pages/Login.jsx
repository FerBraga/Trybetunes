import React from 'react';
import { Redirect } from 'react-router';

import Loading from './Loading';

const userAPI = require('../services/userAPI');

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isBtnDisable: true,
      loading: false,
      newPage: '',
    };
  }

  inputChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState({
      [name]: value,
    }, this.validation);
  }

  validation = () => {
    const characterMin = 3;
    const { user } = this.state;
    const name = user.length >= characterMin;

    if (name) {
      this.setState({ isBtnDisable: false });
    } else {
      this.setState({ isBtnDisable: true });
    }
  }

  buttonClick = async (event) => {
    event.preventDefault();
    const { user } = this.state;
    this.setState({
      loading: true,
    });
    await userAPI.createUser({ name: user });
    this.setState({
      loading: false,
      newPage: '/search',
    });
  }

  render() {
    const { user, isBtnDisable, loading, newPage } = this.state;
    return (
      <div data-testid="page-login">
        {loading ? <Loading />
          : (
            <form>
              <input
                type="text"
                placeholder="Escreva o seu nome"
                data-testid="login-name-input"
                className="inputLogin"
                name="user"
                value={ user }
                onChange={ this.inputChange }
              />
              <button
                type="submit"
                data-testid="login-submit-button"
                className="btnLogin"
                disabled={ isBtnDisable }
                onClick={ this.buttonClick }
              >
                Entrar
              </button>
            </form>)}
        <Redirect to={ newPage } />
      </div>
    );
  }
}

export default Login;
