import React from 'react'
import API from '../../adapters/API'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 600,
    padding: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit,
    textAlign: 'center'
  },
  input: {
    display: 'none'
  }
})

class Register extends React.Component {
    state = {
      username: '',
      password: ''
    }

    componentDidMount () {
    }

    handleSubmit = () => {
      const { username, password } = this.state
      const { login } = this.props
      API.register(username, password)
        .then(data => console.log(data))
        // .then(data => {
        //   console.log(data)
        //   if (data.error) {
        //     console.log(data)
        //     alert(data.error)
        //   } else {
        //     API.login(username, password)
        //       .then(data2 => {
        //         if (data2.message) {
        //           console.log(data2)
        //           alert(data2.message)
        //         } else {
        //           localStorage.setItem('token', data2.token)
        //           login(data2.user.username)
        //         }
        //       })
        //   }
        // })
    }

    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
    }

    render () {
      const { username, password } = this.state
      const { handleChange, handleSubmit } = this
      const { classes } = this.props

      return (
        <Paper>
          <Grid
            container
            spacing={24}
            direction='column'
            alignContent='center'
            alignItems='center'
            justify='center'
            style={{ minHeight: '50vh' }}
          >
            <form>
              <label className='label'>Username: </label> <br />
              <Input className='input' type='text' name='username' onChange={handleChange} value={username} /> <br />
              <label className='label'>Password: </label> <br />
              <Input className='input' type='password' name='password' onChange={handleChange} value={password} /> <br />
            </form>
            <Button onClick={this.handleSubmit} variant='contained' color='primary' className={classes.button}>REGISTER</Button>
          </Grid>
        </Paper>
      )
    }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Register)
