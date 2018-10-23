import React from 'react'
import { connect } from 'react-redux'
import './Forms.css'
import { moment } from '../../datefunctions'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import { compose } from '../../../../../Library/Caches/typescript/3.1/node_modules/redux'
import { MenuItem } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'

// const moment = require('moment');
const timeFrames = ['since two months ago', 'today', 'this week', 'this month', 'between']

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 600,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.primary
  }
})

class FilterForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      category: 'everything',
      timeFrame: 'since two months ago',
      startDate: '',
      endDate: ''
    }
  }

    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
    }

    allowBetweenView = () => {
      this.setState({ betweenDates: true })
    }

    handleSubmit = (event) => {
      event.preventDefault()
      const { category, startDate, endDate } = this.state
      const startToday = moment().hour(0).minute(0).second(0)
      const endToday = moment().hour(23).minute(59).second(59)
      // const moment = require('moment');
      switch (this.state.timeFrame) {
        case 'today':
          this.props.setFilterType(this.state.timeFrame, startToday, endToday, category)
          this.props.filterTransactions(category, startToday, endToday)
          break
        case 'this week':
          // prob want to store details about what start day of week/month equals etc
          let startDayWeek = moment().day('Monday')
          if (moment().day('Monday').isAfter(endToday)) {
            startDayWeek.subtract(7, 'days')
          }
          this.props.setFilterType(this.state.timeFrame, startDayWeek.hour(0).minute(0).second(0), endToday, category)
          this.props.filterTransactions(category, startDayWeek.hour(0).minute(0).second(0), endToday) // refer start of week from dateReducer
          break
        case 'this month':
          this.props.setFilterType(this.state.timeFrame, moment().date(1).hour(0).minute(0).second(0), endToday, category)
          this.props.filterTransactions(category, moment().date(1).hour(0).minute(0).second(0), endToday) // refer start of month from dateReducer
          break
        case 'since two months ago':
          this.props.setFilterType(this.state.timeFrame, moment().subtract(2, 'months').date(1).hour(0).minute(0).second(0), endToday, category)
          this.props.filterTransactions(category, moment().subtract(2, 'months').date(1).hour(0).minute(0).second(0), endToday)
          break
        case 'between':
          const start = moment(startDate).startOf('day')
          const end = moment(endDate).endOf('day')
          this.props.setFilterType(this.state.timeFrame, start, end, category)
          this.props.filterTransactions(category, start, end)
          break
        default:
          console.log('default')
          break
      }
      this.props.toggleFilterForm()
    }

    render () {
      const { classes } = this.props
      let descriptionFilter

      switch (this.props.views.currentView) {
        case 'Expenses':
          descriptionFilter = 'What have I spent on...'
          break
        case 'Income':
          descriptionFilter = 'What have I earnt in...'
          break
        case 'Net':
          descriptionFilter = 'Filter Net by'
          break
        default:
          descriptionFilter = 'Filter'
          break
      }

      let categoryFilter = this.props.categories
        ? (
          <Grid item xs={12} sm container direction='row' >
            <Select value={this.state.category} autoWidth name='category' onChange={this.handleChange}>
              <MenuItem value='everything'>everything</MenuItem>
              {
                this.props.categories.map(category =>
                  <MenuItem value={category} key={category}>{category}</MenuItem>
                )}
            </Select>
          </Grid>)
        : null

      return (

        <Grid className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={24}>
              <Grid item xs={10} />
              <Grid item xs={2}><IconButton color='inherit' onClick={this.props.toggleFilterForm} class='material-icons'>close</IconButton></Grid>
              <Grid item xs={12} sm container direction='row' spacing={16} >
                <p>{descriptionFilter}</p> <br />
                {categoryFilter}
                <Grid item xs={12} sm container direction='row' spacing={16}>
                  <Select value={this.state.timeFrame} autoWidth variant='outlined' name='timeFrame' onChange={this.handleChange}>
                    {timeFrames.map(timeFrame => <MenuItem value={timeFrame} key={timeFrame}>{timeFrame}</MenuItem>
                    )}
                  </Select>
                </Grid>
                {
                  this.state.timeFrame === 'between' &&
                    <Grid item xs={12} sm container direction='row' spacing={16}>
                      <TextField type='date' name='startDate' placeholder='start date' onChange={this.handleChange} />
                      <Typography>&</Typography>
                      <TextField type='date' name='endDate' placeholder='end date' onChange={this.handleChange} />
                    </Grid>
                }
                <Grid item xs={12} sm container direction='row' spacing={16}>
                  <Button color='secondary' variant='contained' onClick={(event) => this.handleSubmit(event)}>FILTER</Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )
    }
}

const mapStateToProps = state => ({
  views: state.viewsReducer
})

FilterForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default compose(
  withStyles(styles, { name: 'FilterForm' }),
  connect(mapStateToProps, null))(FilterForm)
