import React from 'react'
import API from '../../adapters/API'

class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }

handleSubmit = (event) => {
  event.preventDefault()
  const { username, password } = this.state
  const { login } = this.props

  API.login(username, password)
    .then(data => {
      if (data.message) {
        console.log(data)
        alert(data.message)
      } else {
        localStorage.setItem('token', data.token)
        // localStorage.setItem('monzo_token', data.monzo_token) will add once have this set in server
        this.props.last_two_months()
        this.props.store_accounts_details()
        this.props.store_pots_details()
        login(data.user.username)
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
