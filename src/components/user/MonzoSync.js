import React from 'react'
import API from '../../adapters/API'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 600,
    padding: theme.spacing.unit * 1,
    textAlign: 'center',
    alignItems: 'center'
  },
  paper: {
    padding: theme.spacing.unit * 0.5,
    textAlign: 'center',
    color: theme.palette.text.primary
  }
})

class MonzoSync extends React.Component {
  componentDidMount () {
  }

  render () {
    const { classes } = this.props

    // will need to put these in state, and potentially pull from server?
    const client_id = 'oauth2client_00009bXcTSHJgJqAJJ7L6X'
    const redirect_uri = 'https://zealous-kalam-8b6c52.netlify.com/'
    const state_token = 'randomstring' // need to hide this somehow
    const link = `https://auth.monzo.com/?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&state=${state_token}`

    return (
      <Grid className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={0} >
            <Grid item xs={12}>
              <h2>Click to sync the app with your Monzo Account</h2>
              <a href={link} >
                <img src='https://www.vectorlogo.zone/logos/monzo/monzo-card.png' alt='monzo_redirect' width='300' />
              </a>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

    )
  }
}
MonzoSync.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MonzoSync)
