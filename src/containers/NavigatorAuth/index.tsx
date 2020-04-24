import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Header, Left, Icon, Title, Right, Button, Body } from 'native-base'

import Login from '../Login'
import Register from '../Register'
import ForgotPassword from '../ForgotPassword'

import style from './style'

const Stack = createStackNavigator()

export default function NavigatorAuth() {
    return (
        <Stack.Navigator
            screenOptions={{
                header: ({ scene, previous, navigation }: any) => {
                    const { options } = scene.descriptor
                    const title =
                        options.headerTitle !== undefined
                            ? options.headerTitle
                            : options.title !== undefined
                            ? options.title
                            : scene.route.name

                    return (
                        <Header style={style.header}>
                            {previous ? (
                                <Left>
                                    <Button transparent onPress={() => navigation.goBack()}>
                                        <Icon style={{ color: '#000' }} name="arrow-back" />
                                    </Button>
                                </Left>
                            ) : null}

                            <Body>
                                <Title style={{ color: '#000' }}>{title}</Title>
                            </Body>
                            <Right />
                        </Header>
                    )
                }
            }}>
            <Stack.Screen name="Login" component={Login} options={{ title: 'Empower C-19' }} />
            <Stack.Screen name="Register" component={Register} options={{ title: 'Daftar' }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: 'Lupa Password' }} />
        </Stack.Navigator>
    )
}
