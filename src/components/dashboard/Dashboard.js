import React from 'react'
import API from '../../adapters/API'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import ResponsivePie from '../graphs/ResponsivePie'
import CircularProgress from '@material-ui/core/CircularProgress'
import { HalfCircleMeter } from 'react-svg-meters'
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
      totalSpent: '',
      isLoading: true
    }
  }

  componentDidMount () {
    // update account & pot details
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

    this.parseDonutGraphToday()
    this.sumBudgetTotal()
    this.setState({ isLoading: false })
  }

  parseDonutGraphToday = () => {
    let debits
    if (this.props.transactions.debits) {
      debits = JSON.parse(JSON.stringify(this.props.transactions.debits))
    } else if (localStorage.getItem('last_two_months')) {
      debits = JSON.parse(localStorage.getItem('last_two_months')).transactions
      debits.filter(transaction => transaction.amount < 0 && !transaction.metadata.pot_id)
    } else {
      console.log("Transactions isn't in redux or local storage")
    }

    let startDate
    const endDate = moment().hour(23).minute(59).second(59)

    switch (this.props.budget.timeFrame) {
      case 'daily':
        startDate = moment().hour(0).minute(0).second(0)
        break
      case 'weekly':
        startDate = moment().day('Monday')
        if (moment().day('Monday').isAfter(endDate)) {
          startDate.subtract(7, 'days')
        }
        break
      case 'monthly':
        startDate = moment().date(1).hour(0).minute(0).second(0)
        break
      default:
        console.log('Timeframe has not been set as daily, weekly or monthly')
    }

    let filtered = debits.filter(debit => moment(debit.created).isBetween(startDate, endDate))

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
    this.setState({ donutGraphData: newArray, totalSpent: runningTotal })
  }

  calcPercent = (spent, limit) => {
    if (spent === 0) {
      return 0
    } else if (spent > limit) {
      return 100
    } else {
      return Math.round((spent / limit) * 100)
    }
  }

  sumBudgetTotal = () => {
    const { categories } = this.props.budget
    let runningTotal = 0
    Object.keys(categories).forEach(catName => {
      runningTotal += categories[catName]
    })
    this.setState({ budgetTotal: runningTotal })
  }

  render () {
    const { classes } = this.props
    const { isLoading } = this.state

    return (
      <div>
        { isLoading
          ? <CircularProgress color='secondary' size={100} />
          : <Grid className={classes.root}>
            <Paper className={classes.paper}>
              <Grid container spacing={0} >
                <Grid item xs={12}>
                  <h3>Accounts</h3>
                  <p>{this.state.accountName}:  £{this.state.accountBalance / 100}</p>
                </Grid>
                <Grid item xs={12}>
                  <h3>Pots</h3>
                  {this.state.pots.map(pot =>
                    <p key={pot.id}>{pot.name}:  £{pot.balance / 100}</p>
                  )}
                </Grid>
              </Grid>
            </Paper> <br />

            <Paper className={classes.paper}>
              <Grid container spacing={0} >
                <Grid item xs={12}>
                  <h3>Current {this.props.budget.timeFrame} Spend</h3>
              £{this.state.totalSpent}
                  { this.state.donutGraphData.length > 0 &&
                  <ResponsivePie donutGraphData={this.state.donutGraphData} />
                  }
                </Grid>
              </Grid>
            </Paper> <br />

            <Paper className={classes.paper}>
              <Grid container spacing={0} >
                <Grid item xs={12}>
                  <h3>Your {this.props.budget.timeFrame} budget</h3>
                  <HalfCircleMeter value={this.calcPercent(this.state.totalSpent, this.state.budgetTotal)} />
                  <p>You've spent £{this.state.totalSpent} out of your £{this.state.budgetTotal} {this.props.budget.timeFrame} budget</p>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        }
      </div>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Dashboard)
