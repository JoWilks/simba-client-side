import React, { Component } from 'react'
import './App.css'

import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './actions'

import 'typeface-roboto'

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
  loginRedirect= (username) => {
    this.props.login(username)
    const { history } = this.props
    const monzo_token = localStorage.getItem('monzo_token')
    if (monzo_token) {
      const { dispatch } = this.props
      if (localStorage.getItem('last_two_months')) {
        dispatch('STORE_LAST_TWO_MONTHS', JSON.parse(localStorage.getItem('last_two_months')))
        dispatch('STORE_CREDITS')
        dispatch('STORE_DEBITS')
      } else {
        this.props.last_two_months()
      }
      localStorage.getItem('account_details')
        ? dispatch('STORE_ACCOUNTS', JSON.parse(localStorage.getItem('account_details')))
        : this.props.store_accounts_details()
      localStorage.getItem('pot_details')
        ? dispatch('STORE_POTS', JSON.parse(localStorage.getItem('pot_details')))
        : this.props.store_pots_details()
      localStorage.getItem('budget_categories')
        ? dispatch('GET_BUDGET_CATEGORIES', JSON.parse(localStorage.getItem('budget_categories')))
        : this.props.getCategoriesBudget()
      history.push('/dashboard')
    } else {
      history.push('/monzo')
    }
  }

  logout = () => {
    this.props.logout()
    this.props.history.push('/')
  }

  componentDidMount () {
    // check whether users's jwt token still in localstorage & valid if so logins in that user if not sends user to login page
    this.checkForUser()
    // check's if auth token and monzo token not exists, so then can check for response from Monzo auth redirect
    if (!localStorage.getItem('auth_token') && !localStorage.getItem('monzo_token') && !window.location.search === '') {
      this.checkMonzoRedirect()
    }
  }

  checkForUser = () => {
    const token = localStorage.getItem('user_token')
    if (token) {
      API.validate()
        .then(data => {
          if (data.username) {
            this.loginRedirect(data.username)
          } else {
            console.log(data.error)
            this.props.history.push('/login')
          }
        })
    } else {
      this.props.history.push('/login')
    }
  }

  checkMonzoRedirect = () => {
    // gets the code off the end of the url, stores in localstorage, and sends to backend to exchange for monzo_token (access_token)
    let tempVar = window.location.search.split(/=|&/)
    if (tempVar[tempVar.length - 1] === 'randomstring') {
      localStorage.setItem('auth_token', tempVar[1])
      console.log(localStorage)
      this.apiCalltoExchange()
      this.props.history.push('/')
    } else {
      console.log('Error with getting authorization token from Monzo')
    }
  }

  // redundant? done server side?
  apiCalltoExchange = () => {
    API.exchange()
      .then(data => {
        console.log(data)
        if (data['error']) {
          console.log(data['error'])
        } else if (data['access_token']) {
          localStorage.setItem('monzo_token', data['access_token'])
        }
      })
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <NavBar currentUser={this.props.currentUser}
            login={this.login}
            logout={this.logout}
            view={this.props.views.currentView}
            setView={this.props.set_view}
          />
        </header>
        <div className='body'>
          { this.props.currentUser
            ? <Route exact path='/dashboard' component={props => <Dashboard {...this.props} />} />
            : <Route exact path='/login' component={props => <Login loginRedirect={this.loginRedirect} {...this.props} />} />
          }
          <Route exact path='/register' component={props => <Register login={this.login} {...this.props} />} />
          <Route exact path='/monzo' component={props => <MonzoSync {...props} />} />
          <Route exact path='/expenses' component={props => <Debits {...this.props} />} />
          <Route exact path='/budget' component={props => <Budget {...this.props} />} />
          <Route exact path='/income' component={props => <Credits {...this.props} />} />
          <Route exact path='/net' component={props => <Net {...this.props} />} />
        </div>
        <div />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.userReducer,
  transactions: state.transactionsReducer,
  accounts: state.accountsReducer,
  categories: state.categoriesReducer,
  budget: state.budgetCategoriesReducer,
  views: state.viewsReducer
})

export default withRouter(connect(mapStateToProps, actions)(App))
