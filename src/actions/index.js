import { LOGIN, LOGOUT, REGISTER, STORE_ALL_TRANSACTIONS, STORE_ACCOUNTS, STORE_LAST_TWO_MONTHS, STORE_CREDITS, STORE_DEBITS, STORE_POTS, DEBIT_CATEGORIES, CREDIT_CATEGORIES } from './types'
import { moment, now, startDayOfWeek, startDayOfMonth, startDayOfTwoMonthsAgo } from '../datefunctions'
import API from '../adapters/API'
import { Stream } from 'stream';


//USER ACTIONS
export function login (username) {
    return {type: LOGIN, payload: username}
}

export function logout () {
    return {type: LOGOUT, payload: null}
}

export function register (username, password) {
    return {type: REGISTER, payload: {username, password}}
}

//CATEGORY TRANSACTIONS
export const DEBIT_CATEGORIES = 'DEBIT_CATEGORIES'
export const CREDIT_CATEGORIES = 'CREDIT_CATEGORIES'

//TRANSACTION ACTIONS
export function all_transactions () {
    return (dispatch) => {
        API.get_all_transactions()
        .then(data => { console.log(data)
            dispatch({ type: STORE_ALL_TRANSACTIONS, payload: data})
         } )
    }
}

export function last_two_months () {
    return (dispatch) => {
        API.get_range_transactions(startDayOfTwoMonthsAgo.toISOString(), now.toISOString())
        .then(data => { 
            console.log(data)
            dispatch({ type: STORE_LAST_TWO_MONTHS, payload: data})
         } )
        .then(() => {
            dispatch({ type: STORE_CREDITS })
            dispatch({ type: STORE_DEBITS })
        }
        )
    }
}

//ACCOUNT ACTIOONS
export function store_accounts_details () {
    return (dispatch) => {
        API.get_list_accounts()
        .then(data => { console.log(data)
            dispatch({ type: STORE_ACCOUNTS, payload: data})
         })
    }
}

export function store_pots_details () {
    return (dispatch) => {
        API.list_pots()
        .then(data => { console.log(data)
            dispatch({ type: STORE_POTS, payload: data})
         })
    }
}