import React, { Component } from 'react';
import './App.css';

import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './actions'

import API from './adapters/API'

import NavBar from './components/NavBar'
import Login from './components/user/Login'
import Register from './components/user/Register'
import MonzoSync from './components/user/MonzoSync'
import Dashboard from './components/dashboard/Dashboard'
import Debits from './components/debits/Debits'
import Credits from './components/credits/Credits'

class App extends Component {

  login = username => {
    this.props.login(username)
    console.log(this.props)
    this.props.history.push('/dashboard') //going to want to push this to the dashboard
  }

  logout = () => {
    this.props.logout()
    this.props.history.push('/')
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
    return (
      <div className="App">
        <header className="App-header">
          <NavBar currentUser={this.props.currentUser} login={this.login} logout={this.logout} />
        </header>
        <div className='body'>
        { this.props.currentUser
          ? <Route exact path='/dashboard' component={props => <Dashboard {...this.props} />} />
          : <Route exact path='/login' component={props => <Login login={this.login} {...this.props} />} />
        }
        <Route exact path='/register' component={props => <Register login={this.login} {...this.props} />} />
        <Route exact path='/monzo' component={props => <MonzoSync {...props} />} />
        <Route exact path='/debits' component={props => <Debits {...this.props} />} />
        <Route exact path='/credits' component={props => <Credits {...this.props} />} />
        </div>
        <div>
        <button onClick={() => console.log(this.props)}>Check store</button>
        <button onClick={this.props.store_pots_details}>Test</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    currentUser: state.userReducer,
    transactions: state.transactionsReducer,
    accounts: state.accountsReducer
})


export default withRouter(connect(mapStateToProps, actions)(App))
