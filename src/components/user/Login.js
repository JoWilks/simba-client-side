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
