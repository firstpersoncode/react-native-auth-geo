import React from 'react'
import { registerRootComponent } from 'expo'
import { Provider } from 'react-redux'

import configureStore from './src/store'
import App from './src/App'

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
const store = configureStore()
function Wrapper() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

registerRootComponent(Wrapper)
