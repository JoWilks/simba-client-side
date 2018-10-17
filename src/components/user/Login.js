import React from 'react'
import API from '../../adapters/API'

class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }

componentDidMount () {
  debugger
    let tempVar = window.location.search.split(/=|&/)
    if (tempVar[tempVar.length-1] === 'randomstring') {
      localStorage.setItem('exchange_token', tempVar[1])
      API.exchangeForAuthCode()
    } else {
      console.log("Error with getting code from Monzo for authentication")
    }

}

handleSubmit = (event) => {
  event.preventDefault()
  const { username, password } = this.state
  const { loginAppPage } = this.props

  API.login(username, password)
    .then(data => {
      if (data.message) {
        console.log(data)
        alert(data.message)
      } else {
        localStorage.setItem('token', data.token)
        // localStorage.setItem('monzo_token', data.monzo_token) will add once have this set in server
        loginAppPage(data.user.username)
      }
    })
}

handleChange = (event) => {
  this.setState({ [event.target.name]: event.target.value })
}

render () {
  const { username, password } = this.state
  const { handleChange, handleSubmit } = this

  return (
    <div className="">
    <br></br>
      <form onSubmit={handleSubmit}>
            <label className='label'>Username: </label> 
            <input className="input"  type='text' name='username' onChange={handleChange} value={username} /> <br></br>
            
            <label className='label'>Password: </label>
            <input className="input" type='password' name='password' onChange={handleChange} value={password} /> <br></br>

            <button className="button label is-primary">Login</button>
      </form>
    </div>
  )
}
}

export default Login
