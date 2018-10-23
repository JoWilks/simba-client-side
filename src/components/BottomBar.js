import React from 'react'
import { Link } from 'react-router-dom'

// import './Toolbar.css'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import AppBar from '@material-ui/core/AppBar'

const styles = theme => ({
  toolbar: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  toolbar2: {
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  appBar: {
    top: 'auto',
    bottom: 0
  }
})

class BottomBar extends React.Component {
  render () {
    const { classes, toggleViewSettings } = this.props
    let toolbar

    if (toggleViewSettings) {
      toolbar =
        <Toolbar className={classes.toolbar}>
          <IconButton onClick={this.props.toggleViewSettings} style={{ color: '#ffffff' }} className='material-icons'>{this.props.viewSettings ? 'cancel' : 'edit'}</IconButton> <br />
        </Toolbar>
    } else {
      toolbar = <Toolbar className={classes.toolbar2}>
        <IconButton onClick={this.props.toggleFilterForm} style={{ color: '#ffffff' }} className='material-icons'>filter_list</IconButton>
        <IconButton onClick={this.props.toggleListView} style={{ color: '#ffffff' }} className='material-icons'>{this.props.listView ? 'bar_chart' : 'list'}</IconButton>
      </Toolbar>
    }

    // <IconButton onClick={this.props.toggleAddForm} class='material-icons'>add_circle</IconButton>
    return (
      <AppBar position='fixed' color='primary' className={classes.appBar}>
        {toolbar}
      </AppBar>
    )
  }
}

BottomBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BottomBar)
