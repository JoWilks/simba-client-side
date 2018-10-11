import { combineReducers } from 'redux'
import { LOGIN, LOGOUT, REGISTER } from './actions/types'

const userReducer= (state = null, action) => {
    switch (action.type) {
        case LOGIN:
            return state = action.payload
        case LOGOUT:
            localStorage.removeItem('token')
            return state = null
        default:
        return state
    }
}

const rootReducer = combineReducers({
    userReducer: userReducer
})

export default rootReducer