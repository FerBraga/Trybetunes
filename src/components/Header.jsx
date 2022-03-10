import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';

const userAPI = require('../services/userAPI');

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.getNameUser();
  }

  getNameUser = async () => {
    this.setState({
      loading: true,
    });
    const nameUser = await userAPI.getUser();
    this.setState({
      user: nameUser.name,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Loading /> : (
          <div className="headerClass">

            <div className="divHeaderUser">
              <h3 className="logoTrybeHeader">TRYBE</h3>
              <p
                data-testid="header-user-name"
                className="userHeader"
              >
                {`Usuário: ${user}`}
              </p>
            </div>

            <div className="divHeaderOptions">
              <Link
                to="/search"
                data-testid="link-to-search"
                className="linkHeader"
              >
                Pesquisa
              </Link>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
                className="linkHeader"
              >
                Favoritas
              </Link>
              <Link
                to="/profile"
                data-testid="link-to-profile"
                className="linkHeader"
              >
                Perfil
              </Link>
            </div>

          </div>)}
      </header>
    );
  }
}

export default Header;
