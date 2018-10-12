import { SET_CURRENT_TIME } from '../actions/types'

const dateReducer= (state = [], action) => {
    switch (action.type) {
        case SET_CURRENT_TIME:
            return state = action.payload
        default:
        return state
    }
}
export default dateReducer