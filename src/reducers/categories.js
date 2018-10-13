import { DEBIT_CATEGORIES, CREDIT_CATEGORIES } from '../actions/types'

const initialState= {
    debit: [
        'Eating Out',
        'Transport',
        'Groceries',
        'Shopping',
        'Personal Care',
        'Bills',
        'Finances',
        'Entertainment',
        'Expenses',
        'Family',
        'General',
        'Holidays'
    ],
    credit: [
        'Salary',
        'Side Income',
        'Interest',
        'Investment Profit'
    ]
}


const categoriesReducer= (state = initialState, action) => {
    switch (action.type) {
        case DEBIT_CATEGORIES:
            return state.debit
        case CREDIT_CATEGORIES:
            return state.credit
        // case ADD_DEBIT_CATEGORY:
        //     return state.debit
        // case ADD_CREDIT_CATEGORY:
        //     return state.credit
        default:
        return state
    }
}
export default categoriesReducer