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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
};


class NavBar extends React.Component {

  state = {
    anchorEl: null,
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logout = () => {
    this.setState({ anchorEl: null });
    this.props.logout()
  }

  render () {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    //Make some redux state thing that holds title based on page user is on.
    const title = "Dashboard" 
    let navbar

    // if ( this.props.currentUser && localStorage.getItem('monzo_token') ) {
    //     navbar = <React.Fragment>
    //               <Link style={{ color: 'black', textDecoration: 'none' }} to='/dashboard' >
    //                 <MenuItem onClick={this.handleClose}>Dashboard</MenuItem>
    //               </Link>

    //               <Link style={{ color: 'black', textDecoration: 'none' }} to='/expenses'>
    //                 <MenuItem onClick={this.handleClose}>Expenses</MenuItem>
    //               </Link>

    //               <Link style={{ color: 'black', textDecoration: 'none' }} to='/budget'>
    //                 <MenuItem onClick={this.handleClose}>Budget</MenuItem>
    //               </Link>

    //               <Link style={{ color: 'black', textDecoration: 'none' }} to='/income'>
    //                 <MenuItem onClick={this.handleClose}>Income</MenuItem>
    //               </Link>

    //               <Link style={{ color: 'black', textDecoration: 'none' }} to='/net'>
    //                 <MenuItem onClick={this.handleClose}>Net</MenuItem>
    //               </Link>

    //               <Link style={{ color: 'black', textDecoration: 'none' }} to='/monzo'>
    //                 <MenuItem onClick={this.handleClose}>Sync Monzo</MenuItem>
    //               </Link>

    //               <MenuItem onClick={this.logout}>Logout</MenuItem>
    //             </React.Fragment>
    // } else if (this.props.currentUser && !localStorage.getItem('monzo_token')) {
    //   navbar =  <React.Fragment>
    //                 <MenuItem onClick={this.handleClose}><Link style={{ color: 'black', textDecoration: 'none' }} to='/monzo'>Sync Monzo</Link></MenuItem>
    //                 <MenuItem onClick={this.logout}>Logout</MenuItem>
    //             </React.Fragment>
    // } else {
    //   navbar =  <React.Fragment>
    //               <MenuItem onClick={this.handleClose}><Link style={{ color: 'black', textDecoration: 'none' }} to='/login'>Login</Link></MenuItem>
    //               <MenuItem onClick={this.handleClose}><Link to='/register'>Register</Link></MenuItem>
    //             </React.Fragment>
    // }
    
    return (
          <div className={classes.root}>
            <AppBar position="fixed">

              <Toolbar>
                <IconButton className={classes.menuButton}
                 aria-owns={open ? 'menu-appbar' : null}
                 aria-haspopup="true"
                 onClick={this.handleMenu}
                 color="inherit"
                >
                  <MenuIcon />
                  </IconButton>
                  <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={open}
                      onClose={this.handleClose}
                  >

                    <Link style={{ color: 'black', textDecoration: 'none' }} to='/dashboard' >
                      <MenuItem onClick={this.handleClose}>Dashboard</MenuItem>
                    </Link>

                    <Link style={{ color: 'black', textDecoration: 'none' }} to='/budget'>
                      <MenuItem onClick={this.handleClose}>Budget</MenuItem>
                    </Link>

                    <Link style={{ color: 'black', textDecoration: 'none' }} to='/expenses'>
                      <MenuItem onClick={this.handleClose}>Expenses</MenuItem>
                    </Link>

                    <Link style={{ color: 'black', textDecoration: 'none' }} to='/income'>
                      <MenuItem onClick={this.handleClose}>Income</MenuItem>
                    </Link>

                    <Link style={{ color: 'black', textDecoration: 'none' }} to='/net'>
                      <MenuItem onClick={this.handleClose}>Net</MenuItem>
                    </Link>

                    <Link style={{ color: 'black', textDecoration: 'none' }} to='/monzo'>
                      <MenuItem onClick={this.handleClose}>Sync Monzo</MenuItem>
                    </Link>
                    
                    <MenuItem onClick={this.logout}>Logout</MenuItem>

                </Menu>
                  <Typography variant="h6" color="inherit" className={classes.grow}>
                    {"Title"} 
                    {/* this will be dynamically rendered from redux */}
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
