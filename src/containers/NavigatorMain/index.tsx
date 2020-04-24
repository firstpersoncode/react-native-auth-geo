import 'react-native-gesture-handler'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Left, Icon, Title, Right, Button, Body, View } from 'native-base'
import { createStackNavigator } from '@react-navigation/stack'
import { bindActionCreators } from 'redux'

import Verify from '../Verify'
import GoogleMap from '../GoogleMap'
import Profile from '../Profile'
import { setDrawer } from '../../store/app/actions'

import style from './style'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

export default function NavigatorMain() {
    const getHeaderTitle = (route: any) => {
        // Access the tab navigator's state using `route.state`
        const routeName = route.state
            ? // Get the currently active route name in the tab navigator
              route.state.routes[route.state.index].name
            : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
            // In our case, it's "Feed" as that's the first screen inside the navigator
            route.params
            ? route.params.screen
            : 'GoogleMap'

        switch (routeName) {
            case 'GoogleMap':
                return 'Empower C-19'
            case 'Profile':
                return 'Profil'
        }
    }

    const { drawer } = useSelector((state: any) => ({
        drawer: state.app.drawer
    }))

    const dispatch = useDispatch()
    const { dispatchSetDrawer }: any = bindActionCreators({ dispatchSetDrawer: setDrawer }, dispatch)

    const _toggleDrawer = () => {
        dispatchSetDrawer(!drawer)
    }

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
                            {title === 'Profil' ? (
                                <Right>
                                    <Button transparent onPress={_toggleDrawer}>
                                        <Icon style={{ color: '#000' }} name={drawer ? 'close' : 'more'} />
                                    </Button>
                                </Right>
                            ) : null}
                        </Header>
                    )
                }
            }}>
            <Stack.Screen
                name="Main"
                component={Main}
                options={({ route }) => ({
                    headerTitle: getHeaderTitle(route)
                })}
            />
        </Stack.Navigator>
    )
}

function Main() {
    const { session } = useSelector((state: any) => ({
        session: state.app.session
    }))

    return (
        <Tab.Navigator tabBar={(props: any) => <TabBar {...props} />}>
            {session.status ? (
                <>
                    <Tab.Screen name="GoogleMap" component={GoogleMap} options={{ title: 'Peta C-19' }} />
                    <Tab.Screen name="Profile" component={Profile} />
                </>
            ) : (
                <Tab.Screen name="Verify" component={Verify} options={{ title: 'Verifikasi Akun' }} />
            )}
        </Tab.Navigator>
    )
}

function TabBar({ state, descriptors, navigation }: any) {
    const routes: any[] = [].concat(state.routes)
    routes.splice(routes.length > 1 ? routes.length / 2 : routes.length, 0, {
        name: 'Report',
        onPress: () => null
    })

    return (
        <View style={style.tabBar}>
            {routes.map((route: any, index: any) => {
                const isFocused = (state.index > 0 ? state.index + 1 : state.index) === index

                if (route.name === 'Report') {
                    return (
                        <Button key={index} onPress={route.onPress} transparent style={{ flex: 1 }} block>
                            <Icon name="add" style={{ color: isFocused ? 'blue' : '#222' }} />
                        </Button>
                    )
                }

                const { options } = descriptors[route.key]
                // const label =
                //     options.tabBarLabel !== undefined
                //         ? options.tabBarLabel
                //         : options.title !== undefined
                //         ? options.title
                //         : route.name

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key
                    })

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name)
                    }
                }

                let iconName = ''

                if (route.name === 'GoogleMap') {
                    iconName = 'home'
                } else if (route.name === 'Profile') {
                    iconName = 'person'
                }

                return (
                    <Button
                        key={index}
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        onPress={onPress}
                        transparent
                        style={{ flex: 1 }}
                        block>
                        <Icon name={iconName} style={{ color: isFocused ? 'blue' : '#222' }} />
                    </Button>
                )
            })}
        </View>
    )
}
