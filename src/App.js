import React, { Component } from 'react';
import Layout from './components/Layout'
import LoginForm from './components/LoginForm'
//import { Navbar, Button } from 'react-bootstrap';
import './index.css';

class App extends Component {

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }


  render() {

    const { isAuthenticated } = this.props.auth;

    return (
      <div>
          {
            !isAuthenticated() && (<LoginForm />)
          }
          {
            isAuthenticated() && (<Layout />)
          }
      </div>
    );
  }
}

export default App;
