import { GET_BUDGET_CATEGORIES, SET_BUDGET_CATEGORIES } from '../actions/types'
import { stat } from 'fs';

const initialState = {
    timeFrame: 'weekly basis',
    categories: {
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
    }

const budgetCategoriesReducer= (state = initialState, action) => {

    switch (action.type) {
        case GET_BUDGET_CATEGORIES:
            let result = {}
            action.payload.categories.forEach(cat => {
                result[cat.name] = cat.budget_amount
            })
            state['timeFrame'] = action.payload.categories[0].budget_timeframe
            state.categories = result
            return state
        case SET_BUDGET_CATEGORIES:
            console.log("set_budget_categories reducer")
            debugger
            return state
        default:
        return state
    }
}
export default budgetCategoriesReducer