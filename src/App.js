import React, { Component } from 'react';
import './App.css';

import { Route, withRouter } from 'react-router-dom'
import API from './adapters/API'
import NavBar from './components/NavBar'
import Login from './components/user/Login'
import Register from './components/user/Register'

class App extends Component {
  state = {
    currentUser: undefined
  }

  login = username => {
    this.setState({ currentUser: username })
    this.props.history.push('/') //going to want to push this to the dashboard
  }

  logout = () => {
    this.setState({ currentUser: undefined })
    localStorage.removeItem('token')
  }

  componentDidMount () {
    const token = localStorage.getItem('token')
    if (token) {
      API.validate(token)
        .then(data => {
          if (data.username) {
            this.login(data.username)
          } else {
            this.props.history.push('/login')
          }
        })
    }
  }
  render() {

    const { login, logout } = this
    const { currentUser } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <NavBar currentUser={currentUser} login={login} logout={logout} />
        </header>
        <div>
        { currentUser
          ? "Some sort of home page"
          : <Route exact path='/login' component={props => <Login login={login} {...props} />} />
        }
        <Route exact path='/register' component={props => <Register login={login} {...props} />} />
        </div>
      </div>
    );
  }
}

export default withRouter(App)
