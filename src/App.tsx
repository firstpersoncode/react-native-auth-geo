import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'

import configureStore from './store'
import AppContainer from './containers/AppContainer'

const store = configureStore()

export default function App() {
    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    )
}
