import { combineReducers } from 'redux'
import { LOGIN, LOGOUT, REGISTER, ALL_TRANSACTIONS } from '../actions/types'

const userReducer= (state = null, action) => {
    switch (action.type) {
        case LOGIN:
            return state = action.payload
        case LOGOUT:
            localStorage.removeItem('token')
            return state = null
        default:
        return state
    }
}

const transactionsReducer= (state = [], action) => {
    switch (action.type) {
        case ALL_TRANSACTIONS:
            return state = [...action.payload]
        default:
        return state
    }
}

const rootReducer = combineReducers({
    userReducer: userReducer,
    transactionsReducer: transactionsReducer
})

export default rootReducer