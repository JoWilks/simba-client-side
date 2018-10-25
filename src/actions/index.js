import { LOGIN, LOGOUT, REGISTER, STORE_ALL_TRANSACTIONS, STORE_ACCOUNTS,
  STORE_LAST_TWO_MONTHS, STORE_CREDITS, STORE_DEBITS, STORE_POTS,
  DEBIT_CATEGORIES, CREDIT_CATEGORIES, GET_BUDGET_CATEGORIES, PUT_BUDGET_CATEGORIES,
  SET_BUDGET_CATEGORIES, STORE_CURRENT_SPENDING, SET_VIEW,
  SET_BC_IS_FETCHING, SET_BC_FETCHING_SUCCESS, SET_BC_FETCH_ERROR } from './types'
import { moment, today, startDayOfWeek, startDayOfMonth, startDayOfTwoMonthsAgo } from '../datefunctions'
import API from '../adapters/API'
// import { Stream } from 'stream';

// DYNAMIC DISPATCH
export function dispatch (type, payload) {
  return { type, payload }
}

// VIEWS ACTIONS
export function set_view (stringNameView) {
  return { type: SET_VIEW, payload: stringNameView }
}

// USER ACTIONS
export function login (username) {
  return { type: LOGIN, payload: username }
}

export function logout () {
  return { type: LOGOUT, payload: null }
}

export function register (username, password) {
  return { type: REGISTER, payload: { username, password } }
}

// CATEGORY TRANSACTIONS
export function get_debit_categories () {
  return { type: DEBIT_CATEGORIES }
}

export function get_credit_categories () {
  return { type: CREDIT_CATEGORIES }
}

export function store_current_spending (current_spending) {
  return { type: STORE_CURRENT_SPENDING, payload: current_spending }
}

// TRANSACTION ACTIONS
export function all_transactions () {
  return (dispatch) => {
    API.get_all_transactions()
      .then(data => {
        console.log(data)
        dispatch({ type: STORE_ALL_TRANSACTIONS, payload: data })
      })
  }
}

export function last_two_months () {
  return (dispatch) => {
    const startDayOfTwoMonthsAgo = moment().subtract(2, 'months').date(1)
    const today = moment()
    API.get_range_transactions(startDayOfTwoMonthsAgo.toISOString(), today.toISOString())
      .then(data => {
        console.log(data)
        dispatch({ type: STORE_LAST_TWO_MONTHS, payload: data })
        localStorage.setItem('last_two_months', JSON.stringify(data))
      })
      .then(() => {
        dispatch({ type: STORE_CREDITS })
        dispatch({ type: STORE_DEBITS })
      })
  }
}

// ACCOUNT ACTIONS
export function store_accounts_details () {
  return (dispatch) => {
    API.get_list_accounts()
      .then(data => {
        if (data) { console.log(data) }
        dispatch({ type: STORE_ACCOUNTS, payload: data })
        localStorage.setItem('account_details', JSON.stringify(data))
      })
  }
}

export function store_pots_details () {
  return (dispatch) => {
    API.list_pots()
      .then(data => {
        console.log(data)
        dispatch({ type: STORE_POTS, payload: data })
        localStorage.setItem('pot_details', JSON.stringify(data))
      })
  }
}

// CATEGORIES/BUDGET ACTIONS

export function getCategoriesBudget () {
  return (dispatch) => {
    // dispatch(SET_BC_IS_FETCHING, true)
    // dispatch(SET_BC_FETCHING_SUCCESS, false)
    // dispatch(SET_BC_FETCH_ERROR, null) // no actually error checks on the server side

    API.get_categories_budgets()
      .then(data => {
        console.log(data)
        dispatch({ type: GET_BUDGET_CATEGORIES, payload: data })
        // dispatch(SET_BC_IS_FETCHING, false)
        // dispatch(SET_BC_FETCHING_SUCCESS, true)
        localStorage.setItem('budget_categories', JSON.stringify(data))
      })
  }
}

export function setCategoriesBudget (budgetObj) {
  return { type: SET_BUDGET_CATEGORIES, payload: budgetObj }
}

export function putCategoriesBudget (budgetObj) {
  return (dispatch) => {
    dispatch(setIsBCFetching(true))
    dispatch(setBCFetchingSuccess(false))
    dispatch(setBCFetchError(null)) // no actually error checks on the server side

    API.set_categories_budgets(budgetObj)
      .then(data => {
        console.log(data)
        dispatch({ type: PUT_BUDGET_CATEGORIES, payload: data })
        dispatch(setIsBCFetching(false))
        dispatch(setBCFetchingSuccess(true))
        dispatch(setBCFetchError(null))
        localStorage.setItem('budget_categories', JSON.stringify(data))
      })
  }
}

export function setIsBCFetching (boolean) {
  return { type: SET_BC_FETCHING_SUCCESS, payload: boolean }
}

export function setBCFetchingSuccess (boolean) {
  return { type: SET_BC_FETCHING_SUCCESS, payload: boolean }
}

export function setBCFetchError (state) {
  return { type: SET_BC_FETCHING_SUCCESS, payload: state }
}
