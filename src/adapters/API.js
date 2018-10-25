import { get } from 'https'
require('dotenv').config()

const user_token = localStorage.getItem('user_token')

class API {
  // USER API CALLS
  static login (username, password) {
    return fetch(API.loginURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username,
          password
        }
      })
    }).then(resp => resp.json())
  }

  static validate () {
    return fetch(API.validateURL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user_token}`
      }
    }).then(resp => resp.json())
  }

  static register (username, password) {
    return fetch(API.registerURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: {
          username,
          password
        }
      })
    }).then(resp => resp.json())
  }

  //redundant
  static exchange () {
    return fetch(API.baseURL + '/exchange', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user_token}`
      },
      body: JSON.stringify({
        exchange: {
          auth_token: localStorage.getItem('auth_token')
        }
      })
    })
      .then(resp => resp.json())
  }

    //redundant
  static refresh () {
    return fetch(API.baseURL + '/refresh', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user_token}`
      }
    })
      .then(resp => resp.json())
  }

  // RAILS BUDGET CALLS

  static get_categories_budgets () {
    return fetch(API.budgetCatURL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('user_token')}`
      }
    })
      .then(resp => resp.json())
  }

  static set_categories_budgets (budgetObj) {
    return fetch(API.budgetCatURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('user_token')}`
      },
      body: JSON.stringify({ budgetObj })
    })
      .then(resp => resp.json())
  }

  // MONZO AUTH CALLS REDUNDANT
  static check_access_token (monzo_token) {
    return fetch('https://api.monzo.com/ping/whoami', {
      headers: { 'Authorization': `Bearer ${monzo_token}` }
    })
      .then(resp => resp.json())
  }

  // MONZO API CALLS

  static get_list_accounts () {
    const monzo_token = localStorage.getItem('monzo_token')
    return fetch(API.listAccountsURL, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${monzo_token}` }
    })
      .then(resp => resp.json())
  }

  static read_balance_account () {
    const monzo_token = localStorage.getItem('monzo_token')
    return fetch(API.readBalanceURL + `?account_id=${account_id}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${monzo_token}` }
    })
      .then(resp => resp.json())
  }

  static list_pots () {
    const monzo_token = localStorage.getItem('monzo_token')
    return fetch(API.listPotsURL, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${monzo_token}` }
    })
      .then(resp => resp.json())
  }

  static get_all_transactions () {
    const monzo_token = localStorage.getItem('monzo_token')
    return fetch(API.getAllTransactionsURL + `?account_id=${account_id}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${monzo_token}` }
    })
      .then(resp => resp.json())
  }

  static get_range_transactions (since, before) {
    // need to convert the DateTimes to An RFC 3339 encoded-timestamp, can do new Date().toISOString()
    const monzo_token = localStorage.getItem('monzo_token')
    const rest_url = `&since=${since}&before${before}`
    return fetch(API.getAllTransactionsURL + `?&account_id=${account_id}${rest_url}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${monzo_token}` }
    })
      .then(resp => resp.json())
  }
}

API.baseURL = 'http://localhost:3000/api/v1'

API.registerURL = API.baseURL + '/register'
API.loginURL = API.baseURL + '/login'
API.validateURL = API.baseURL + '/validate'

API.budgetCatURL = API.baseURL + '/categories'

API.monzoBaseURL = 'https://api.monzo.com'
API.exchangeTokenURL = API.monzoBaseURL + '/oauth2/token'

API.listAccountsURL = API.monzoBaseURL + '/accounts'
API.readBalanceURL = API.monzoBaseURL + '/balance'
API.listPotsURL = API.monzoBaseURL + '/pots'
API.getAllTransactionsURL = API.monzoBaseURL + '/transactions'

const account_id = 'acc_00009YD5n3MghHFkmJCPib'

export default API
