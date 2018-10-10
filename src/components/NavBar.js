import React from 'react'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  render () {
    const props = this.props
    return (
      <nav className='navbar is-transparent test' aria-label='main navigation'>
        <div className='navbar-brand'>
          <React.Fragment>
            Icon
          </React.Fragment>
        </div>

              <div className='navbar-item'>
                {props.currentUser && `Hello, ${props.currentUser}.`}
              </div>

              <div className='navbar-item'>
                {
                  props.currentUser
                    ? <button className='button' onClick={props.logout}>LOGOUT</button>
                    : <React.Fragment>
                      <Link to='/login'>
                        <button className="button is-primary">Login</button>
                      </Link>
                      <Link to='/register'>
                        <button className="button is-info">Register</button>
                      </Link>
                    </React.Fragment>
                }
              </div>
      </nav>
    )
  }
}

export default NavBar
