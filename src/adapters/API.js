import { get } from 'https'
require('dotenv').config()

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

  static validate (token) {
    return fetch(API.validateURL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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

//RAILS BUDGET CALLS

  static getBudget () {
    return fetch(API.budget, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(resp => resp.json())
  }

  static setBudget (budgetObj) {
    //budgetObj format ex { timeFrame: weekly, eating_out: 50 ... }
    return fetch(API.budget, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ budgetObj })
    })
    .then(resp => resp.json())
  }


// MONZO AUTH CALLS

  static exchangeForAuthCode () {
    const client_id = "oauth2client_00009bXcUYcbaBlM4oMMqX"
    const client_secret = "mnzpub.4SIcUmdjk6TAj8EyelSL5RS6sOCj+LB/LhiQt1NsmyQzWJ8Hwqbr39evxUfZHp2yGN7US1pDwwu5Y7boLIb5"
    const redirect_uri = "https://zealous-kalam-8b6c52.netlify.com/" 
    const authorization_code = localStorage.getItem('auth_code')

    return fetch(API.exchangeToken, {
      method: 'POST',
      body:  JSON.stringify({
        grant_type: 'authorization_code',
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: redirect_uri,
        code: authorization_code
      })
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      localStorage.setItem('monzo_token', data.access_token)
    })
  }


//MONZO API CALLS

  static get_list_accounts () {
    return fetch(API.listAccounts, {
      method: 'GET',
      headers: {'Authorization':`Bearer ${monzo_token}`}
    })
    .then(resp => resp.json())
  }

  static read_balance_account () {
    return fetch(API.readBalance + `?account_id=${account_id}`, {
      method: 'GET',
      headers: {'Authorization':`Bearer ${monzo_token}`}
    })
    .then(resp => resp.json())
  }

  static list_pots () {
    return fetch(API.listPots, {
      method: 'GET',
      headers: {'Authorization':`Bearer ${monzo_token}`}
    })
    .then(resp => resp.json())
  }

  static get_all_transactions () {
    return fetch(API.getAllTransactions + `?account_id=${account_id}`, {
      method: 'GET',
      headers: {'Authorization':`Bearer ${monzo_token}`}
    })
    .then(resp => resp.json())
  }

  static get_range_transactions (since, before) {
    //need to convert the DateTimes to An RFC 3339 encoded-timestamp, can do new Date().toISOString()
    const rest_url = `&since=${since}&before${before}`
    return fetch(API.getAllTransactions + `?&account_id=${account_id}${rest_url}`, {
      method: 'GET',
      headers: {'Authorization':`Bearer ${monzo_token}`}
    })
    .then(resp => resp.json())
  }

}

API.baseURL = 'http://localhost:3000/api/v1'

API.registerURL = API.baseURL + '/register'
API.loginURL = API.baseURL + '/login'
API.validateURL = API.baseURL + '/validate'

API.Budget = API.baseURL + '/budget'

API.monzoBaseURL = 'https://api.monzo.com'
API.exchangeToken = API.monzoBaseURL + '/oauth2/token'

API.listAccounts = API.monzoBaseURL + '/accounts'
API.readBalance = API.monzoBaseURL + '/balance'
API.listPots = API.monzoBaseURL + '/pots'
API.getAllTransactions = API.monzoBaseURL + '/transactions'

const monzo_token = localStorage.getItem('monzo_token')
const account_id = 'acc_00009YD5n3MghHFkmJCPib'

export default API
