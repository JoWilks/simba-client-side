import { DEBIT_CATEGORIES, CREDIT_CATEGORIES } from '../actions/types'

const categoriesReducer= (state = {debit: null, credit: null}, action) => {
    switch (action.type) {
        case DEBIT_CATEGORIES:
            const curr = JSON.parse(JSON.stringify(state))
            curr.accounts = action.payload.accounts
            return state = curr
        case CREDIT_CATEGORIES:
            const curr1 = JSON.parse(JSON.stringify(state))
            curr1.pots = action.payload.pots
            return state = curr1
        default:
        return state
    }
}
export default accountsReducer