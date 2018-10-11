import { LOGIN, LOGOUT, REGISTER, STORE_ALL_TRANSACTIONS } from './types'
import API from '../adapters/API'
//import data so can put into payload

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
        return fetch( 'https://api.monzo.com/transactions' + `?account_id=${account_id}`, {
            method: 'GET',
            headers: {'Authorization':`Bearer ${monzo_token}`}
        })
        .then(resp => resp.json() )
        .then(data => { console.log(data)
            dispatch({ type: STORE_ALL_TRANSACTIONS, payload: data})
         } )
        .then(() => console.log("DONE STORING") )
    }
}

export function three_months_transactions () {
    return (dispatch) => {
        dispatch({ type: 'THREE_MONTHS_TRANSACTIONS'})

        const d = new Date("2012/01/14");
        console.log(d.toLocaleDateString());
        d.setMonth(d.getMonth() - 3);
        console.log(d.toLocaleDateString());

        return API.get_range_transactions( )
        .then(resp => resp.json() )
        .then(data => { console.log(data)
            dispatch({ type: STORE_ALL_TRANSACTIONS, payload: data})
         } )
        .then(() => console.log("DONE STORING") )
    }
}

const monzo_token = localStorage.getItem('monzo_token')
const account_id = 'acc_00009YD5n3MghHFkmJCPib'