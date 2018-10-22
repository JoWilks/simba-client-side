import React from 'react'
import Transactionview from './Transactionview'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { List } from '@material-ui/core';


const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  });

class Listview extends React.Component {

    render () {
        const { classes } = this.props;
        const transactions = this.props.transactions ? this.props.transactions.reverse() : []
        return (
            <div>
                {
                    this.props.transactions &&
                    transactions.map(transaction => 
                        <Transactionview transaction={transaction} key={transaction.id}/>
                    
                    )
                }
            </div>
        )
    }


}

Listview.propTypes = {
    classes: PropTypes.object.isRequired,
  };


export default withStyles(styles)(Listview)