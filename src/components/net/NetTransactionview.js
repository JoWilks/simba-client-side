import React from 'react'
import '../templates/Lists.css'
import { moment } from '../../datefunctions'


class NetTransactionview extends React.Component {

    // convertDate = (stringDate) => {
    //   return moment(stringDate).format("dddd Do MMMM")
    // }

    render () {
        const { item } = this.props
        return (
            <div className='transaction-box' key={item.x}> 

                <div className='middle-box'>
                    <div className='date'>{item.x}</div>
                </div>
                
                <div className='amount'>{`£${item.y}`}</div>
            </div>
        )
    }


}


export default NetTransactionview