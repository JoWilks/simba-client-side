import React from 'react'
import API from '../../adapters/API'

class Dashboard extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
                accountName: '',
                accountBalance: 0,
                pots: []
        }
    }

    componentDidMount () {
        const { accountName } = this.state
        if (accountName === '') {
            API.get_list_accounts()
            .then(data => this.setState({ accountName: data['accounts'][0].description }))
    
            API.read_balance_account()
            .then(data => this.setState({ accountBalance: data.balance }))
    
            API.list_pots()
            .then(data => this.setState({ pots: data['pots'] }))
        }
        
    }

    render () {
        return (
            <div className='dashboard-container'>

                <div className='accounts-box'>
                <h3>Accounts</h3>
                    <p>{this.state.accountName}:  {this.state.accountBalance/100}</p>
                <h3>Pots</h3>
                    {this.state.pots.map(pot => 
                        <p key={pot.id}>{pot.name}:  {pot.balance/100}</p>
                    )}
                </div>

            </div>

        )
    }


}


export default Dashboard