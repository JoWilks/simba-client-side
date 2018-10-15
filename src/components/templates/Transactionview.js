import React from 'react'
import './Lists.css'
import { moment } from '../../datefunctions'


class Transactionview extends React.Component {

    convertDate = (stringDate) => {
      return moment(stringDate).format("dddd Do MMMM")
    }

    render () {
        const { transaction } = this.props
        return (
            <div className='transaction-box' key={transaction.id}> 
                <div className='category'>{transaction.category}</div>

                <div className='middle-box'>
                    <div className='date'>{transaction.settled === 'Invalid Date' ? 
                    this.convertDate(transaction.created) : 
                    this.convertDate(transaction.settled)}</div>
                    <div className='name'> 
                        <h4>{transaction.counterparty.name ? transaction.counterparty.name : transaction.description}</h4>
                    </div>
                    <div className='notes'>
                        <p>{transaction.notes}</p>
                    </div>
                </div>
                
                <div className='amount'>{`$${transaction.amount < 0 ? transaction.amount/-100: transaction.amount/100}`}</div>
            </div>
        )
    }


}


export default Transactionview