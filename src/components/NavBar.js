import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

class NavBar extends React.Component {
  render () {
    const props = this.props

    //Make some redux state thing that holds title based on page user is on.
    const title = "Income" 
    
    return (
      <nav className='navbar'>
          <div className='rest'>
              <div className='dropdown'>
                <button className='dropbtn'>Menu</button>
                {
                  props.currentUser
                    ? 
                    <div className='dropdown-content'>
                      <p className='user'>{props.currentUser && `Hello, ${props.currentUser}.`}</p>
                      <Link to='/debits'>Expenses</Link>
                      <Link to='/credits'>Income</Link>
                      <Link to='/monzo'>Sync Monzo</Link>
                      <a onClick={props.logout}>LOGOUT</a>
                    </div>
                    : 
                    <div className='dropdown-content'> 
                    <React.Fragment>
                      <Link to='/login'>Login</Link>
                      <Link to='/register'>Register</Link>
                    </React.Fragment>
                    </div>
                }
              </div>
          </div>
          <div className='title'><span>{title}</span></div>
      </nav>
    )
  }
}

export default NavBar
