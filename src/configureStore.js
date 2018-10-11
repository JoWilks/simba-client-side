import { createStore } from 'redux'
import rootReducer from './reducers'

const configureStore = () =>  {
    return createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ / window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    )
}

export default configureStore