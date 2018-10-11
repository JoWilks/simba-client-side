import React from 'react'
import API from '../../adapters/API'

class MonzoSync extends React.Component {

    render () {
        //will need to put these in state, and potentially pull from server?
        const client_id = "oauth2client_00009bXbTwawriRvwomm8n"
        const redirect_uri = "http://localhost:3000/" //will definitely need to change to an actual hosted domain
        const state_token = "randomstring" 
        const link = `https://auth.monzo.com/?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&state=${state_token}`

        return (
            <div>
                <h1>Click to sync the app with your Monzo Account</h1>
                <a href={link}>
                    <img src='https://www.vectorlogo.zone/logos/monzo/monzo-card.png' alt='monzo_redirect' />
                </a>
            </div>
        )
    }


}


export default MonzoSync