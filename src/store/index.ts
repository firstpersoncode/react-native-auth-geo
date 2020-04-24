import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import app from './app'
import user from './user'
import report from './report'

export default () => {
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
        (require('redux-devtools-extension') && require('redux-devtools-extension').composeWithDevTools({})) ||
        compose

    const store = createStore(
        combineReducers({
            app,
            user,
            report
        }),
        {},
        composeEnhancers(applyMiddleware(thunk))
    )

    return store
}
