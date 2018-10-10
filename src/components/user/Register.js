import React from 'react'
import API from '../../adapters/API'

class Register extends React.Component {
    state = {
      username: '',
      password: ''
    }

    handleSubmit = () => {
      const { username, password } = this.state
      const { login } = this.props
      API.register(username, password)
        .then(data => {
          console.log(data)
          if (data.error) {
            console.log(data)
            alert(data.error)
          } else {
            API.login(username, password)
              .then(data2 => {
                if (data2.message) {
                  console.log(data2)
                  alert(data2.message)
                } else {
                  localStorage.setItem('token', data2.token)
                  login(data2.user.username)
                }
              })
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
        <div className='login container'>
          <form>
            <div className='field is-horizontal'>
              <div className='field-label is-normal'>
                <label className='label'>Username: </label>
              </div>
              <div className='field-body'>
                <div className='field'>
                  <div className='control'>
                    <input className='input' type='text' name='username' onChange={handleChange} value={username} />
                  </div>
                </div>
              </div>
            </div>
            <div className='field is-horizontal'>
              <div className='field-label is-normal'>
                <label className='label'>Password: </label>
              </div>
              <div className='field-body'>
                <div className='field'>
                  <div className='control'>
                    <input className='input' type='password' name='password' onChange={handleChange} value={password} />
                  </div>
                </div>
              </div>

            </div>
            <div className='field is-horizontal'>
              <div className='field-label is-normal'>
                <button className='button label is-primary' onClick={handleSubmit}>Register</button>
              </div>
            </div>
          </form>
        </div>
      )
    }
}

export default Register
