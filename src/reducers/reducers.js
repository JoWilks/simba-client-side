import { combineReducers } from 'redux'
import transactionsReducer from './transaction'
import categoriesReducer from './categories'
import budgetCategoriesReducer from './budgetCategories'
import accountsReducer from './account'
import userReducer from './user'
import dateReducer from './date'
import viewsReducer from './views'


const rootReducer = combineReducers({
    userReducer: userReducer,
    transactionsReducer: transactionsReducer,
    accountsReducer: accountsReducer,
    dateReducer: dateReducer,
    categoriesReducer: categoriesReducer,
    budgetCategoriesReducer: budgetCategoriesReducer,
    viewsReducer: viewsReducer

})

export default rootReducer