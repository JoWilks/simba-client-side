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

//MONZO API CALLS

  static get_list_accounts () {
    return fetch(API.listAccounts, {
      method: 'GET',
      headers: {'Authorization':`Bearer ${monzo_token}`}
    })
    .then(resp => resp.json())
    // .then(data => console.log(data))
    //do some sort of dispatch to reducer to set state in store
    //will need to store account_id when do get_list_accounts
  }

  static read_balance_account () {
    return fetch(API.readBalance + `?account_id=${account_id}`, {
      method: 'GET',
      headers: {'Authorization':`Bearer ${monzo_token}`}
    })
    .then(resp => resp.json())
    // .then(data => console.log(data))
    //do some sort of dispatch to reducer to set state in store
  }

  static list_pots () {
    return fetch(API.listPots, {
      method: 'GET',
      headers: {'Authorization':`Bearer ${monzo_token}`}
    })
    .then(resp => resp.json())
    // .then(data => console.log(data))
    //do some sort of dispatch to reducer to set state in store
  }

  static get_all_transactions () {
    return fetch(API.getAllTransactions + `?account_id=${account_id}`, {
      method: 'GET',
      headers: {'Authorization':`Bearer ${monzo_token}`}
    })
    .then(resp => resp.json())
    // .then(data => console.log(data))
    //do some sort of dispatch to reducer to set state in store
  }

  static get_range_transactions (since, before) {
    //need to convert the DateTimes to An RFC 3339 encoded-timestamp, can do new Date().toISOString()
    const rest_url = `&since=${since}&before${before}`
    return fetch(API.getAllTransactions + `?&account_id=${account_id}${rest_url}`, {
      method: 'GET',
      headers: {'Authorization':`Bearer ${monzo_token}`}
    })
    .then(resp => resp.json())
    // .then(data => console.log(data))
    //do some sort of dispatch to reducer to set state in store
  }

}

API.baseURL = 'http://localhost:3000/api/v1'

API.registerURL = API.baseURL + '/register'
API.loginURL = API.baseURL + '/login'
API.validateURL = API.baseURL + '/validate'

API.monzoBaseURL = 'https://api.monzo.com'
API.listAccounts = API.monzoBaseURL + '/accounts'
API.readBalance = API.monzoBaseURL + '/balance'
API.listPots = API.monzoBaseURL + '/pots'
API.getAllTransactions = API.monzoBaseURL + '/transactions'
// API.getRangeTransactions = API.monzoBaseURL + '/transactions'

const monzo_token = localStorage.getItem('monzo_token')
const account_id = 'acc_00009YD5n3MghHFkmJCPib'

export default API
