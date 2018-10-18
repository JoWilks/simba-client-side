import { GET_BUDGET_CATEGORIES, SET_BUDGET_CATEGORIES } from '../actions/types'

const initialState = {
        eating_out: 0,
        transport: 0,
        groceries: 0,
        shopping: 0,
        personal_care: 0,
        bills: 0,
        finances: 0,
        entertainment: 0,
        expenses: 0,
        family: 0,
        general: 0,
        holidays: 0
}

const budgetCategoriesReducer= (state = initialState, action) => {

    switch (action.type) {
        case GET_BUDGET_CATEGORIES:
            return state = action.payload
        case SET_BUDGET_CATEGORIES:
            return state = action.payload
        default:
        return state
    }
}
export default budgetCategoriesReducer