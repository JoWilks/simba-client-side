import React from 'react'
import { moment, now, startDayOfWeek, startDayOfMonth, startDayOfTwoMonthsAgo, convertISOToNiceDate } from '../../datefunctions'


class Transactionview extends React.Component {

    convertDate = (stringDate) => {
      return moment(stringDate).format("dddd Do MMMM")
    }

    render () {
        const { transaction } = this.props
        return (
            <div key={transaction.id}> 
                <h3>{transaction.description}</h3>
                <h4>{this.convertDate(transaction.settled)}</h4>
                <h4>{`$${transaction.amount/-100}`}</h4>
                <h4>{transaction.category}</h4>
                <p>{transaction.notes}</p>
            </div>
        )
    }


}


export default Transactionview