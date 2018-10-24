import React from 'react'
import { moment } from '../../datefunctions'
import API from '../../adapters/API'
import BottomBar from '../BottomBar'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import { MenuItem } from '@material-ui/core'

import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const timeFrames = ['monthly', 'weekly', 'daily']

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    textAlign: 'center'
  },
  label: {
    justifyContent: 'space-between',
    textAlign: 'left',
    textTransform: 'capitalize'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  }
})

class BudgetSettings extends React.Component {
  constructor (props) {
    super(props)
    const budgetCat = props.budget.categories
    const timeFrame = props.budget.timeFrame
    this.state = {
      budgetCat,
      timeFrame,
      runningTotal: 0
    }
  }

    handleChange = (event) => {
      let value
      if (Number(event.target.value)) {
        value = Number(event.target.value) 
      } else if (event.target.value === '') {
        value = 0
      } else {
        value = event.target.value
      }
      const name = event.target.name
      this.setState(prev => ({ ...prev, budgetCat: { ...prev.budgetCat, [`${name}`]: value } }))
    }

    handleDropdown = (event) => {
      this.props.setTimeFrame(event.target.value)
      this.setState({ timeFrame: event.target.value })
    }

    handleSubmit = (event) => {
      event.preventDefault()
      let budgetObj = JSON.parse(JSON.stringify(this.state))
      this.props.putCategoriesBudget(budgetObj)
      this.props.setCategoriesBudget(budgetObj)
      this.props.calculateBudget()
      this.props.toggleViewSettings()
    }

    calcTotal = () => {
      const { budgetCat } = this.state
      let runningTotal = 0
      Object.keys(budgetCat).forEach(key => {
        runningTotal += (this.state.budgetCat[key])
      })
      this.setState({ runningTotal })
    }

    test = () => {
      let budgetObj = JSON.parse(JSON.stringify(this.state))
      this.props.setCategoriesBudget(budgetObj)
    }

    render () {
      const { budgetCat } = this.state
      const { classes } = this.props

      return (
        <Paper className={classes.root}>

          <FormControl variant='filled' className={classes.formControl}>
            <FormLabel component='legend'>Set your timeframe for your budget...</FormLabel>
            <Select value={this.state.timeFrame} autoWidth variant='outlined' name='timeFrame' onChange={this.handleDropdown}>
              {timeFrames.map(timeFrame => <MenuItem value={timeFrame} key={timeFrame}>{timeFrame}</MenuItem>)}
            </Select><br />
            <FormLabel component='legend'>Set your budgets for each category...</FormLabel><br />
            {
              Object.keys(this.state.budgetCat).map(key =>
                <FormControlLabel className={classes.label} key={key} control={<Input type='number' name={key}
                  onSelect={this.calcTotal}
                  onChange={this.handleChange}
                  placeholder={budgetCat[key]} />
                } label={key} labelPlacement='start'
                />
              )
            }
            <p>For a total spend of £{this.state.runningTotal} on a {this.state.timeFrame} basis</p>
            <Button color='secondary' variant='contained' onClick={this.handleSubmit}>SUBMIT</Button>
          </FormControl>

        </Paper>
      )
    }
}

BudgetSettings.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BudgetSettings)
