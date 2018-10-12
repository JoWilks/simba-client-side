import { STORE_ACCOUNTS, STORE_POTS } from '../actions/types'

const accountsReducer= (state = {accounts: null, pots: null}, action) => {
    switch (action.type) {
        case STORE_ACCOUNTS:
            const curr = JSON.parse(JSON.stringify(state))
            curr.accounts = action.payload.accounts
            return state = curr
        case STORE_POTS:
            const curr1 = JSON.parse(JSON.stringify(state))
            curr1.pots = action.payload.pots
            return state = curr1
        default:
        return state
    }
}
export default accountsReducer