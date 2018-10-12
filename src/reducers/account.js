import { STORE_ACCOUNTS } from '../actions/types'

const transactionsReducer= (state = [], action) => {
    switch (action.type) {
        case STORE_ACCOUNTS:
            return state = action.payload
        default:
        return state
    }
}
export default transactionsReducer