import React, { Component } from 'react';

class Login extends Component {
  
  login() {
    this.props.auth.login();
  }
  
  render() {
    const { isAuthenticated } = this.props.auth;

    
    return (
      <div className="container">
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  <b>Log In</b>
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    );
  }
}

export default Login;
