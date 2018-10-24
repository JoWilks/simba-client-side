import { GET_BUDGET_CATEGORIES, SET_BUDGET_CATEGORIES, PUT_BUDGET_CATEGORIES, STORE_CURRENT_SPENDING, SET_BC_IS_FETCHING, SET_BC_FETCHING_SUCCESS, SET_BC_FETCH_ERROR } from '../actions/types'

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
  targetsSpent: [],
  isFetching: false,
  fetchSuccess: false,
  fetchError: null
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
    case PUT_BUDGET_CATEGORIES:
      action.payload.budgetCat.forEach(cat => {
        result[cat.name] = cat.budget_amount
      })
      state['timeFrame'] = action.payload.budgetCat[0].budget_timeframe
      state.categories = result
      return state
    case SET_BUDGET_CATEGORIES:
      return Object.assign({}, state, {
        categories: action.payload.budgetCat
      })
    case STORE_CURRENT_SPENDING:
      state.targetsSpent = action.payload
      return state
    case SET_BC_IS_FETCHING:
      return Object.assign({}, state, {
        isFetching: action.payload
      })
    case SET_BC_FETCHING_SUCCESS:
      return Object.assign({}, state, {
        fetchSuccess: action.payload
      })
    case SET_BC_FETCH_ERROR:
      return Object.assign({}, state, {
        fetchError: action.payload
      })
    default:
      return state
  }
}
export default budgetCategoriesReducer
