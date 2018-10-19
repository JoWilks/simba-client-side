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
    if ( localStorage.getItem('auth_token') && !localStorage.getItem('monzo_token') ) {
      this.API.exchange().then(data => console.log(data))
    } else if (localStorage.getItem('monzo_token')) {
      //check if current Monzo_token expired
        API.check_access_token
        .then( data => {
          console.log(data)
          if (data["access_token"]) {
            console.log("token still good")
            this.props.last_two_months()
            this.props.getCategoriesBudget()
            this.props.history.push('/dashboard')
          } else {
            console.log(data["error"])
          }
        })
    } else {
        this.props.history.push('/monzo')
    }
  }

  logout = () => {
    this.props.logout()
    this.props.history.push('/')
  }

  componentDidMount () {

    //check whether app user still logged in
    this.checkForUser()
    //check for response from Monzo auth redirect
    if (localStorage.getItem('auth_token')) {
      this.checkMonzoRedirect()
    }

  }

  checkForUser = () => {
    const token = localStorage.getItem('token')
    if ( token ) {
      API.validate()
        .then(data => {
          if (data.username) {
            this.loginAppPage(data.username)
          } else {
            this.props.history.push('/login')
          }
        })
    }

  }

  checkMonzoRedirect = () => {
    let tempVar = window.location.search.split(/=|&/)
    if (tempVar[tempVar.length-1] === 'randomstring') {
      localStorage.setItem('auth_token', tempVar[1])
      console.log(localStorage)
      API.exchange()
      .then(data => {console.log(data) 
        localStorage.setItem('monzo_token', data["access_token"])})
    } else {
      console.log("Error with getting code from Monzo for authentication")
    }
  }

  checkAccessTokenStatus = () => {
    API.check_access_token()
    .then( data => {
      if (data["error"]) {
        console.log(data["error"])
        API.refresh()
      } else {
        console.log("Current token still good")
        return true
      }
    })
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    currentUser: state.userReducer,
    transactions: state.transactionsReducer,
    accounts: state.accountsReducer,
    categories: state.categoriesReducer,
    budget: state.budgetCategoriesReducer
})


export default withRouter(connect(mapStateToProps, actions)(App))
