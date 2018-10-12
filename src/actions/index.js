import { LOGIN, LOGOUT, REGISTER, STORE_ALL_TRANSACTIONS, STORE_ACCOUNTS, STORE_LAST_TWO_MONTHS, STORE_CREDITS, STORE_DEBITS } from './types'
import { moment, now, startDayOfWeek, startDayOfMonth, startDayOfTwoMonthsAgo } from '../datefunctions'
import API from '../adapters/API'

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
        // dispatch({ type: 'ALL_TRANSACTIONS'})
        API.get_all_transactions()
        .then(data => { console.log(data)
            dispatch({ type: STORE_ALL_TRANSACTIONS, payload: data})
         } )
        .then(() => console.log("DONE STORING") )
    }
}

export function last_two_months () {
    return (dispatch) => {
        // dispatch({ type: 'STORE_LAST_TWO_MONTHS'})
        API.get_range_transactions(startDayOfTwoMonthsAgo.toISOString(), now.toISOString())
        .then(data => { 
            console.log(`API data ${data}`)
            dispatch({ type: STORE_LAST_TWO_MONTHS, payload: data})
         } )
        .then(() => {
            dispatch({ type: STORE_CREDITS })
            dispatch({ type: STORE_DEBITS })
        }
        )
    }
}

export function store_accounts_details () {
    return (dispatch) => {
        // dispatch({ type: 'GET_ACCOUNTS'})
        API.get_list_accounts()
        .then(data => { console.log(data)
            dispatch({ type: STORE_ACCOUNTS, payload: data})
         } )
        .then(() => console.log("DONE") )
    }
}
