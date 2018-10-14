import { DEBIT_CATEGORIES, CREDIT_CATEGORIES } from '../actions/types'

const initialState= {
    debit: [
        'eating_out',
        'transport',
        'groceries',
        'shopping',
        'personal_care',
        'bills',
        'finances',
        'entertainment',
        'expenses',
        'family',
        'general',
        'holidays'
    ],
    credit: [
        'salary',
        'side income',
        'interest',
        'investment profit'
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