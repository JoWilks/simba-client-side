import { LOGIN, LOGOUT, REGISTER, STORE_ALL_TRANSACTIONS, STORE_ACCOUNTS } from './types'
import API from '../adapters/API'
//import data so can put into payload

var moment = require('moment');

export function login (username) {
    return {type: LOGIN, payload: username}
}

export function logout () {
    return {type: LOGOUT, payload: null}
}

export function register (username, password) {
    return {type: REGISTER, payload: {username, password}}
}

export function all_transactions () {
    return (dispatch) => {
        dispatch({ type: 'ALL_TRANSACTIONS'})
        API.get_all_transactions()
        .then(data => { console.log(data)
            dispatch({ type: STORE_ALL_TRANSACTIONS, payload: data})
         } )
        .then(() => console.log("DONE STORING") )
    }
}

export function three_months_transactions () {
    return (dispatch) => {
        dispatch({ type: 'THREE_MONTHS_TRANSACTIONS'})

    

        return API.get_range_transactions( )
        .then(resp => resp.json() )
        .then(data => { console.log(data)
            dispatch({ type: STORE_ALL_TRANSACTIONS, payload: data})
         } )
        .then(() => console.log("DONE STORING") )
    }
}

export function get_accounts () {
    return (dispatch) => {
        dispatch({ type: 'GET_ACCOUNTS'})
        
        API.get_list_accounts()
        .then(data => { console.log(data)
            dispatch({ type: STORE_ACCOUNTS, payload: data})
         } )
        .then(() => console.log("DONE") )
    }
}


// const monzo_token = localStorage.getItem('monzo_token')
// const account_id = 'acc_00009YD5n3MghHFkmJCPib'