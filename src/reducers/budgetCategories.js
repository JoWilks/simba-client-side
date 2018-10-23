import { GET_BUDGET_CATEGORIES, SET_BUDGET_CATEGORIES, STORE_CURRENT_SPENDING } from '../actions/types'

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
  },
  targetsSpent: []
}

const budgetCategoriesReducer = (state = initialState, action) => {
  let result = {}

  switch (action.type) {
    case GET_BUDGET_CATEGORIES:
      action.payload.categories.forEach(cat => {
        result[cat.name] = cat.budget_amount
      })
      state['timeFrame'] = action.payload.categories[0].budget_timeframe
      state.categories = result
      return state
    case SET_BUDGET_CATEGORIES:
      action.payload.budgetCat.forEach(cat => {
        result[cat.name] = cat.budget_amount
      })
      state['timeFrame'] = action.payload.budgetCat[0].budget_timeframe
      state.categories = result
      return state
    case STORE_CURRENT_SPENDING:
      state.targetsSpent = action.payload
      return state
    default:
      return state
  }
}
export default budgetCategoriesReducer
