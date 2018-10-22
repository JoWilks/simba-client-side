import React from 'react'
import './Lists.css'
import { moment } from '../../datefunctions'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 600,
    padding: theme.spacing.unit * 0.5,
    textAlign: 'center',
    alignItems: 'center'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
})

class Transactionview extends React.Component {
    convertDate = (stringDate) => {
      return moment(stringDate).format('dddd Do MMMM')
    }

    render () {
      const { transaction, classes } = this.props
      return (
        <Paper className={classes.root}>
          <Grid container spacing={0} key={transaction.id}>
            <Grid item xs={3} container direction='column'>{transaction.category}</Grid>

            <Grid item xs={6} container direction='column'>
              <div className='date'>{this.convertDate(transaction.created)}</div>
            </Grid>

            <Grid item xs={3} container direction='column' >{`£${transaction.amount < 0 ? transaction.amount / -100 : transaction.amount / 100}`}</Grid>

            <Grid item xs={12}>
              <Grid item xs={12} container direction='row'>
                <h4>{transaction.counterparty.name ? transaction.counterparty.name : transaction.description}</h4>
              </Grid>
              <Grid item xs={12}container direction='row'>
                <p>{transaction.notes}</p>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      )
    }
}

Transactionview.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Transactionview)
