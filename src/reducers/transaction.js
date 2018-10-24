import { STORE_ALL_TRANSACTIONS, STORE_LAST_TWO_MONTHS, STORE_CREDITS, STORE_DEBITS } from '../actions/types'

const initialState = {
  all: null,
  twoMonths: null,
  credits: null,
  debits: null,
  isFetching: false,
  fetchSuccess: false,
  fetchError: null
}

const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_ALL_TRANSACTIONS:
      return state.all = [action.payload.transactions]
    case STORE_LAST_TWO_MONTHS:
      const curr = JSON.parse(JSON.stringify(state))
      curr.twoMonths = action.payload.transactions
      return state = curr
    case STORE_CREDITS:
      const curr1 = JSON.parse(JSON.stringify(state))
      const filteredCredits = state.twoMonths.filter(transaction => transaction.amount > 0 && !transaction.metadata.pot_id)
      curr1.credits = filteredCredits
      return state = curr1
    case STORE_DEBITS:
      const curr2 = JSON.parse(JSON.stringify(state))
      const filteredDebits = state.twoMonths.filter(transaction => transaction.amount < 0 && !transaction.metadata.pot_id)
      curr2.debits = filteredDebits
      return state = curr2
    
    default:
      return state
  }
}
export default transactionsReducer
