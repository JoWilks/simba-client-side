import { SET_VIEW } from '../actions/types'

// SET_VIEW takes a string and setst he current view to the name of the current page it's on

const viewsReducer = (state = { currentView: 'Dashboard' }, action) => {
  switch (action.type) {
    case 'SET_VIEW':
      let currState = JSON.parse(JSON.stringify(state))
      currState.currentView = action.payload
      return state = currState
    default:
      return state
  }
}

export default viewsReducer
