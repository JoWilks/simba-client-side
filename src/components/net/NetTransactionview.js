import React from 'react'
import '../templates/Lists.css'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import { moment } from '../../datefunctions'

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 600,
    padding: theme.spacing.unit * 1.5,
    textAlign: 'center',
    alignItems: 'center'
  },
  rootNeg: {
    flexGrow: 1,
    maxWidth: 600,
    padding: theme.spacing.unit * 1.5,
    textAlign: 'center',
    alignItems: 'center',
    color: 'red'
  },
  rootPos: {
    flexGrow: 1,
    maxWidth: 600,
    padding: theme.spacing.unit * 1.5,
    textAlign: 'center',
    alignItems: 'center',
    color: 'green'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
})

class NetTransactionview extends React.Component {
  render () {
    const { item, classes } = this.props

    let style
    if (item.y === 0) {
      style = 'root'
    } else if (item.y > 0 ) {
      style = 'rootPos'
    } else {
      style = 'rootNeg'
    }

    return (
      <Paper className={classes[style]}>
        <Grid container spacing={8}>
          <Grid item xs={8} container direction='column'>
            {item.x}
          </Grid>
          <Grid item xs={4} container direction='column'>
            {`£${item.y}`}
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

NetTransactionview.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NetTransactionview)
