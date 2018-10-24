import { LOGIN, LOGOUT, REGISTER } from '../actions/types'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN:
      return state = action.payload
    case LOGOUT:
      localStorage.clear()
      return state = null
    case REGISTER: // add some functionality?
      return state
    default:
      return state
  }
}

export default userReducer
