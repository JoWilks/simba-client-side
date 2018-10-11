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

  static get_accounts () {
    return 
  }


}

API.baseURL = 'http://localhost:3000/api/v1'

API.registerURL = API.baseURL + '/register'
API.loginURL = API.baseURL + '/login'
API.validateURL = API.baseURL + '/validate'

export default API
