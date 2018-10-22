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

class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      accountName: '',
      accountBalance: 0,
      pots: []
    }
  }

  componentDidMount () {
    const { accountName } = this.state
    // may not need
    if (accountName === '') {
      API.get_list_accounts()
        .then(data => this.setState({ accountName: data['accounts'][0].description }))

      API.read_balance_account()
        .then(data => this.setState({ accountBalance: data.balance }))

      API.list_pots()
        .then(data => this.setState({ pots: data['pots'] }))
    }
  }

  render () {
    const { classes } = this.props
    return (
      <Grid className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={0} >
            <Grid item xs={12}>
              <h3>Accounts</h3>
              <p>{this.state.accountName}:  {this.state.accountBalance / 100}</p>
            </Grid>
            <Grid item xs={12}>
              <h3>Pots</h3>
              {this.state.pots.map(pot =>
                <p key={pot.id}>{pot.name}:  {pot.balance / 100}</p>
              )}
            </Grid>
          </Grid>
        </Paper> <br />

        <Paper className={classes.paper}>
          <Grid container spacing={0} >
            <Grid item xs={12}>
              <h3>{"This Month/This Week/Today's"} Spend</h3>
              {'£200'}
              {'donut graph of usage'}
            </Grid>
          </Grid>
        </Paper> <br />

        <Paper className={classes.paper}>
          <Grid container spacing={0} >
            <Grid item xs={12}>
              <h3>Your Budget</h3>
              { 'graph of percentage users spend towards total budget' }
            </Grid>
          </Grid>
        </Paper>
      </Grid>

    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Dashboard)
