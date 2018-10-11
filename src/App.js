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

class App extends Component {

  login = username => {
    this.props.login(username)
    this.props.history.push('/dashboard') //going to want to push this to the dashboard
  }

  logout = () => {
    this.props.logout()
    this.props.history.push('/')
  }

  get_all_transactions_test = () => {
    this.props.all_transactions()

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
        <div>
        { this.props.currentUser
          ? <Route exact path='/dashboard' component={props => <Dashboard {...props} />} />
          : <Route exact path='/login' component={props => <Login login={this.login} {...props} />} />
        }
        <Route exact path='/register' component={props => <Register login={this.login} {...props} />} />
        <Route exact path='/monzo' component={props => <MonzoSync {...props} />} />
        </div>
        <div>
        <button onClick={API.get_list_accounts}>Get list accounts</button>
        <button onClick={API.read_balance_account}>Read Balance Account</button>
        <button onClick={API.list_pots}>List Pots</button>
        <button onClick={API.get_all_transaction}>Get all transactions</button>
        <button onClick={() => API.get_range_transactions(new Date(2018,9).toISOString(),new Date(2018,9,1).toISOString())}>Get Range Transactions</button>
        </div>
        <div>
        <button onClick={this.props.all_transactions}>Test store transactions</button>
        <button onClick={() => console.log(this.props.transactions)}>Check transactions store</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    currentUser: state.userReducer,
    transactions: state.transactionsReducer
})


export default withRouter(connect(mapStateToProps, actions)(App))
