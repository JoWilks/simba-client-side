import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './reducers/reducers'

const configureStore = (initialState) =>  {
    return createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ / window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__,
        applyMiddleware(thunk)
    )
}

export default configureStore