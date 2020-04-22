import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import { bindActionCreators } from 'redux'
import { Spinner, Root } from 'native-base'
import { enableScreens } from 'react-native-screens'

import Main from './containers/Main'
import Login from './containers/Login'
import Register from './containers/Register'
import Verify from './containers/Verify'
import ForgotPassword from './containers/ForgotPassword'
import { sessionFetch } from './store/app/effects'

// Before rendering any navigation stack
enableScreens()

const Stack = createStackNavigator()

const style = StyleSheet.create({
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 10000,
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
})

export default function App() {
    const [isReady, setIsReady] = useState(false)

    const _initialRender = async () => {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font
        })

        dispatchSessionFetch()

        setIsReady(true)
    }

    const dispatch = useDispatch()
    const { dispatchSessionFetch }: any = bindActionCreators({ dispatchSessionFetch: sessionFetch }, dispatch)

    useEffect(() => {
        _initialRender()
    }, [])

    const { loading, session } = useSelector((state: any) => ({
        loading: state.app.loading,
        session: state.app.session
    }))

    if (!isReady) {
        return (
            <View style={style.loading}>
                <Spinner color="blue" />
            </View>
        )
    }

    return (
        <Root>
            <NavigationContainer>
                <Stack.Navigator>
                    {session.publicId ? (
                        session.status ? (
                            <Stack.Screen name="Main" component={Main} options={{ title: 'Empower C-19' }} />
                        ) : (
                            <Stack.Screen name="Verify" component={Verify} />
                        )
                    ) : (
                        <>
                            <Stack.Screen name="Login" component={Login} options={{ title: 'Empower C-19' }} />
                            <Stack.Screen name="Register" component={Register} options={{ title: 'Daftar' }} />
                            <Stack.Screen
                                name="ForgotPassword"
                                component={ForgotPassword}
                                options={{ title: 'Lupa Password' }}
                            />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
            {loading ? (
                <View style={style.loading}>
                    <Spinner color="blue" />
                </View>
            ) : null}
        </Root>
    )
}
