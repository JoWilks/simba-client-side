import React from 'react'
import { Link } from 'react-router-dom'

import 'typeface-roboto'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

class NavBar extends React.Component {
  state = {
    anchorEl: null
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked })
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  };

  handleClose = () => {
    this.setState({ anchorEl: null })
  };

  handleLink = (viewName) => {
    this.handleClose()
    this.props.setView(viewName)
  }

  logout = () => {
    this.handleClose()
    this.props.logout()
  }

  render () {
    const { classes } = this.props
    const { auth, anchorEl } = this.state
    const open = Boolean(anchorEl)

    let toolbar
    if (this.props.currentUser) {
      toolbar = <div>
        <Link style={{ color: 'black', textDecoration: 'none' }} to='/dashboard' >
          <MenuItem onClick={() => this.handleLink('Dashboard')}>Dashboard</MenuItem>
        </Link>

        <Link style={{ color: 'black', textDecoration: 'none' }} to='/budget'>
          <MenuItem onClick={() => this.handleLink('Budget')}>Budget</MenuItem>
        </Link>

        <Link style={{ color: 'black', textDecoration: 'none' }} to='/expenses'>
          <MenuItem onClick={() => this.handleLink('Expenses')}>Expenses</MenuItem>
        </Link>

        <Link style={{ color: 'black', textDecoration: 'none' }} to='/income'>
          <MenuItem onClick={() => this.handleLink('Income')}>Income</MenuItem>
        </Link>

        <Link style={{ color: 'black', textDecoration: 'none' }} to='/net'>
          <MenuItem onClick={() => this.handleLink('Net')}>Net</MenuItem>
        </Link>

        <Link style={{ color: 'black', textDecoration: 'none' }} to='/monzo'>
          <MenuItem onClick={() => this.handleLink('Sync Monzo')}>Sync Monzo</MenuItem>
        </Link>

        <MenuItem onClick={this.logout}>Logout</MenuItem>
      </div>
    } else {
      toolbar = <div>
        <Link 
          style={{ color: 'black', textDecoration: 'none' }} to='/login'>
          <MenuItem onClick={() => this.handleLink('Login')}>Login</MenuItem>
        </Link>
        <Link style={{ color: 'black', textDecoration: 'none' }} to='/register'>
          <MenuItem onClick={() => this.handleLink('Register')}>Register</MenuItem>
        </Link>
      </div>
    }

    return (
      <div className={classes.root}>
        <AppBar position='fixed'>

          <Toolbar>
            <IconButton className={classes.menuButton}
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup='true'
              onClick={this.handleMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={open}
              onClose={this.handleClose}>

              { toolbar }

            </Menu>
            <Typography variant='h6' color='inherit' className={classes.grow}>
              {this.props.view}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

NavBar.propTypes = {
  classes: propTypes.object.isRequired
}

export default withStyles(styles)(NavBar)
