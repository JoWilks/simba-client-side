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
import Budget from './components/budget/Budget'
import Credits from './components/credits/Credits'
import Net from './components/net/Net'

class App extends Component {

  loginAppPage = username => {
    this.props.login(username)
    if (localStorage.getItem('monzo_token')) {
      this.props.last_two_months()
      this.props.history.push('/dashboard') //going to want to push this to the dashboard
    } else{
      this.props.history.push('/monzo')
    }
  }

  logout = () => {
    this.props.logout()
    this.props.history.push('/')
  }

  componentDidMount () {
    const token = localStorage.getItem('token')
    if (token) {
      API.validate(
      )
        .then(data => {
          if (data.username) {
            this.loginAppPage(data.username)
          } else {
            this.props.history.push('/login')
          }
        })
    }

    let tempVar = window.location.search.split(/=|&/)
    if (tempVar[tempVar.length-1] === 'randomstring') {
      localStorage.setItem('auth_code', tempVar[1])
      console.log(localStorage)
      API.exchangeForAuthCode()
    } else {
      console.log("Error with getting code from Monzo for authentication")
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
          : <Route exact path='/login' component={props => <Login loginAppPage={this.loginAppPage} {...this.props} />} />
        }
        <Route exact path='/register' component={props => <Register login={this.login} {...this.props} />} />
        <Route exact path='/monzo' component={props => <MonzoSync {...props} />} />
        <Route exact path='/expenses' component={props => <Debits {...this.props} />} />
        <Route exact path='/budget' component={props => <Budget {...this.props} />} />
        <Route exact path='/income' component={props => <Credits {...this.props} />} />
        <Route exact path='/net' component={props => <Net {...this.props} />} />
        </div>
        <div>
        {/* <button onClick={() => console.log(this.props)}>Check store</button>
        <button onClick={this.props.store_pots_details}>Test</button> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    currentUser: state.userReducer,
    transactions: state.transactionsReducer,
    accounts: state.accountsReducer,
    categories: state.categoriesReducer
})


export default withRouter(connect(mapStateToProps, actions)(App))
