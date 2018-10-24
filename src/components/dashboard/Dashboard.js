import React from 'react'
import API from '../../adapters/API'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { ResponsivePie } from '@nivo/pie'
import { moment } from '../../datefunctions'

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
      pots: [],
      donutGraphData: [],
      total: ''
    }
  }

  componentDidMount () {
    //update account & pot details
    const { accountName } = this.state

    const accountDetails = JSON.parse(localStorage.getItem('account_details'))
    const potDetails = JSON.parse(localStorage.getItem('pot_details'))
    if (accountDetails.accounts.length !== 0 && accountName === '') {
      API.read_balance_account()
        .then(data => {
          this.setState({ accountName: accountDetails.accounts[0].description,
            accountBalance: data.balance,
            pots: potDetails.pots })
        })
    } else {
      console.log("Error, haven't got account details")
    }

    // this.parseDonutGraphToday()
  }

  parseDonutGraphToday = () => {
    let debits = JSON.parse(JSON.stringify(this.props.transactions.debits))
    const startToday = moment().hour(0).minute(0).second(0)
    const endToday = moment().hour(23).minute(59).second(59)
    debugger
    let filtered = debits.filter(debit => moment(debit.endToday).isBetween(startToday, endToday))

    const pieGraphData = []
    filtered.forEach(transaction => {
      if (pieGraphData[transaction.category]) {
        pieGraphData[transaction.category]['value'] += transaction.amount < 0
          ? transaction.amount / -1
          : transaction.amount
      } else {
        let obj = {}
        obj['id'] = transaction.category
        obj['label'] = transaction.category
        obj['value'] = transaction.amount < 0
          ? (transaction.amount / -1)
          : transaction.amount
        pieGraphData[transaction.category] = obj
      }
    })

    let newArray = []
    Object.keys(pieGraphData).forEach(function (key) {
      pieGraphData[key].value /= 100 // converts from pence/cents to £/$
      newArray.push(pieGraphData[key])
    })

    let runningTotal = 0
    newArray.forEach(cat => { runningTotal += cat.value })
    this.setState({ donutGraphData: newArray, total: runningTotal })
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
              <h3>Today's Spend</h3>
              {}
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
