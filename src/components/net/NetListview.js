import React from 'react'
import NetTransactionview from './NetTransactionview'

class NetListview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            net: []
            
        }
    
    }
    componentDidMount () {

    }

    render () {
        return (
            <div>
                {
                    this.props.net &&
                    this.props.net.reverse().map(item => 
                        <NetTransactionview item={item} key={item.x}/>
                    
                    )
                }
            </div>
        )
    }


}


export default NetListview