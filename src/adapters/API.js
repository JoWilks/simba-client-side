import { get } from 'https'

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
    const monzo_token = localStorage.getItem(monzo_token)
    return fetch(API.listAccounts, {
      headers: {'Authorization':`Bearer ${monzo_token}`}
    })
    .then(resp => resp.json())
    //do some sort of dispatch to reducer to set state in store
  }


}

API.baseURL = 'http://localhost:3000/api/v1'

API.registerURL = API.baseURL + '/register'
API.loginURL = API.baseURL + '/login'
API.validateURL = API.baseURL + '/validate'

API.baseURL = 'http://api.monzo.com/'
API.listAccounts = API.baseURL + '/accounts'
API.readBalance = API.baseURL + '/balance'
API.listPots = API.baseURL + '/pots'
API.getAllTransactions = API.baseURL + '/transactions'
API.getRangeTransactions = API.baseURL + '/transactions'

export default API
