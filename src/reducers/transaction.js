import { STORE_ALL_TRANSACTIONS } from '../actions/types'

const transactionsReducer= (state = [], action) => {
    switch (action.type) {
        case STORE_ALL_TRANSACTIONS:
            return state = action.payload
        default:
        return state
    }
}
export default transactionsReducer