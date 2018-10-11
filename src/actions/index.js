import { LOGIN, LOGOUT, REGISTER, ALL_TRANSACTIONS } from './types'
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

export function all_transactions (transactions) {
    return {type: ALL_TRANSACTIONS, payload: {transactions}}
}