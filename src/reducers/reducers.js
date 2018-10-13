import { combineReducers } from 'redux'
import transactionsReducer from './transaction'
import categoriesReducer from './categories'
import accountsReducer from './account'
import userReducer from './user'
import dateReducer from './date'

const rootReducer = combineReducers({
    userReducer: userReducer,
    transactionsReducer: transactionsReducer,
    accountsReducer: accountsReducer,
    dateReducer: dateReducer,
    categoriesReducer: categoriesReducer
})

export default rootReducer