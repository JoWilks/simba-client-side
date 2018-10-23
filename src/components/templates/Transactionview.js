import React from 'react'
import './Lists.css'
import { moment } from '../../datefunctions'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { IconButton } from '@material-ui/core'

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

      let icon

      switch (transaction.category) {
        case 'eating_out':
          icon = <IconButton style={{ color: 'rgb(115,205,31)' }} className='material-icons'>restaurant</IconButton>
          // colour '115,205,31'
          break
        case 'transport':
          icon = <IconButton style={{ color: 'rgb(0,104,129)' }} className='material-icons'>directions_car</IconButton>
          // colour '0,104,129'
          break
        case 'groceries':
          icon = <IconButton style={{ color: 'rgb(244,148,5)' }} className='material-icons'>local_grocery_store</IconButton>
          // colour '244,148,5'
          break
        case 'shopping':
          icon = <IconButton style={{ color: 'rgb(241,0,122)' }} className='material-icons'>local_mall</IconButton>
          // colour '241,0,122'
          break
        case 'personal_care':
          icon = <IconButton style={{ color: 'rgb(238,10,14)' }} className='material-icons'>favorite</IconButton>
          // colour '238,10,14'
          break
        case 'bills':
          icon = <IconButton style={{ color: 'rgb(0,154,214)' }} className='material-icons'>offline_bolt</IconButton>
          // colour '0,154,214'
          break
        case 'finances':
          icon = <IconButton style={{ color: 'rgb(5,177,69)' }} className='material-icons'>local_atm</IconButton>
          // colour '5,177,69'
          break
        case 'entertainment':
          icon = <IconButton style={{ color: 'rgb(155,87,255)' }} className='material-icons'>insert_emoticon</IconButton>
          // colour '155,87,255'
          break
        case 'expenses':
          icon = <IconButton style={{ color: 'rgb(137,39,2)' }} className='material-icons'>monetization_on</IconButton>
          // colour '137,39,2'
          break
        case 'family':
          icon = <IconButton style={{ color: 'rgb(0,56,192)' }} className='material-icons'>home</IconButton>
          // colour '0,56,192'
          break
        case 'general':
          icon = <IconButton style={{ color: 'rgb(101,101,101)' }} className='material-icons'>category</IconButton>
          // colour '101,101,101'
          break
        case 'holidays':
          icon = <IconButton style={{ color: 'rgb(255,108,62)' }} className='material-icons'>flight_takeoff</IconButton>
          // colour '255,108,62'
          break
        default:
          icon = <IconButton style={{ color: 'rgb(66, 66, 66)' }} className='material-icons'>broken_image</IconButton>
      }

      return (
        <Paper className={classes.root}>
          <Grid container spacing={0} key={transaction.id}>
            <Grid item xs={3} container direction='column'>{icon}</Grid>

            <Grid item xs={6} container direction='column'>
              {this.convertDate(transaction.created)}
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
