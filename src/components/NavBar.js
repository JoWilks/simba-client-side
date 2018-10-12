import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

class NavBar extends React.Component {
  render () {
    const props = this.props
    return (
      <nav className='navbar'>
      <div className='rest'>

              <div className='navbar-item'>
                {props.currentUser && `Hello, ${props.currentUser}.`}
              </div>

              <div className='navbar-item'>
                {
                  props.currentUser
                    ? <div>
                      <button className='button' onClick={props.logout}>LOGOUT</button>
                      <Link to='/monzo'>
                        <button className="button is-info">Sync Monzo</button>
                      </Link>
                      <Link to='/debits'>
                        <button className="button is-info">Expenses</button>
                      </Link>
                      <Link to='/credits'>
                        <button className="button is-info">Income</button>
                      </Link>
                      </div>
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
              </div>
      </nav>
    )
  }
}

export default NavBar
