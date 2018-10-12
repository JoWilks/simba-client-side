import { SET_CURRENT_TIME, SET_START_DAY_WEEK, SET_START_DATE_MONTH } from '../actions/types'

const dateReducer= (state = {now: null, start_day_week: "Monday", start_day_month: null}, action) => {
    switch (action.type) {
        case SET_CURRENT_TIME:
            return state.now = action.payload
        case SET_START_DAY_WEEK:
            return state.start_day_week     //will be populated by settings details from server
        case SET_START_DATE_MONTH: //stretch goal
            return state
        default:
        return state
    }
}
export default dateReducer