import { LOGIN, LOGOUT, REGISTER, STORE_ALL_TRANSACTIONS, STORE_ACCOUNTS, STORE_LAST_TWO_MONTHS, STORE_CREDITS, STORE_DEBITS, STORE_POTS, DEBIT_CATEGORIES, CREDIT_CATEGORIES, GET_BUDGET_CATEGORIES, SET_BUDGET_CATEGORIES, STORE_CURRENT_SPENDING } from './types'
import { moment, today, startDayOfWeek, startDayOfMonth, startDayOfTwoMonthsAgo } from '../datefunctions'
import API from '../adapters/API'
// import { Stream } from 'stream';


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
export function get_debit_categories () {
    return {type: DEBIT_CATEGORIES}
}

export function get_credit_categories () {
    return {type: CREDIT_CATEGORIES}
}

export function store_current_spending (current_spending) {
    return {type: STORE_CURRENT_SPENDING, payload: current_spending }
}

//TRANSACTION ACTIONS
export function all_transactions () {
    return (dispatch) => {
        API.get_all_transactions()
        .then(data => { console.log(data)
            dispatch({ type: STORE_ALL_TRANSACTIONS, payload: data})
         })
    }
}

export function last_two_months () {
    return (dispatch) => {
        API.get_range_transactions(startDayOfTwoMonthsAgo.toISOString(), today.toISOString())
        .then(data => { 
            console.log(data)
            dispatch({ type: STORE_LAST_TWO_MONTHS, payload: data})
         } )
        .then(() => {
            dispatch({ type: STORE_CREDITS })
            dispatch({ type: STORE_DEBITS })
        })
    }
}

//ACCOUNT ACTIONS
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

//CATEGORIES/BUDGET ACTIONS

export function getCategoriesBudget () {
    return (dispatch) => {
        API.get_categories_budgets()
        .then(data => { console.log(data)
            dispatch({ type: GET_BUDGET_CATEGORIES, payload: data })
        })
    }
}

export function setCategoriesBudget (budgetObj) {
    return (dispatch) => {
        API.set_categories_budgets(budgetObj)
        .then(data => { console.log(data)
            dispatch({ type: SET_BUDGET_CATEGORIES, payload: data })
        })
    }
}

