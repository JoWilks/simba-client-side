import React from 'react'
import Transactionview from './Transactionview'

class Listview extends React.Component {

    render () {
        return (
            <div>
                {
                    this.props.transactions &&
                    this.props.transactions.map(transaction => 
                        <Transactionview transaction={transaction}/>
                    )
                }
            </div>
        )
    }


}


export default Listview