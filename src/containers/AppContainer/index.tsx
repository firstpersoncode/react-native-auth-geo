import React, { useEffect, useState } from 'react'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { View } from 'react-native'
import { bindActionCreators } from 'redux'
import { Spinner, Root, Container } from 'native-base'
import { enableScreens } from 'react-native-screens'
import { NavigationContainer } from '@react-navigation/native'

import { sessionFetch } from '../../store/app/effects'
import NavigatorMain from '../NavigatorMain'
import NavigatorAuth from '../NavigatorAuth'

import style from './style'

// Before rendering any navigation stack
enableScreens(true)

export default function AppContainer() {
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
            <Container>
                <NavigationContainer>{session.publicId ? <NavigatorMain /> : <NavigatorAuth />}</NavigationContainer>
                {loading ? (
                    <View style={style.loading}>
                        <Spinner color="blue" />
                    </View>
                ) : null}
            </Container>
        </Root>
    )
}
