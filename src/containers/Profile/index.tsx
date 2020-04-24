import React, { useRef, useEffect } from 'react'
import {
    View,
    Content,
    Button,
    Text,
    Form,
    Item,
    Label,
    Input,
    Left,
    Body,
    ListItem,
    Icon,
    Right,
    Switch
} from 'native-base'
import { useSelector, useDispatch } from 'react-redux'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'
import { bindActionCreators } from 'redux'

import { setDrawer } from '../../store/app/actions'
import { logOut } from '../../store/app/effects'

import style from './style'

export default function Profile() {
    const { session, drawer } = useSelector((state: any) => ({
        session: state.app.session,
        drawer: state.app.drawer
    }))

    const drawerEl: any = useRef(null)
    const dispatch = useDispatch()
    const { dispatchSetDrawer, dispatchLogOut }: any = bindActionCreators(
        { dispatchSetDrawer: setDrawer, dispatchLogOut: logOut },
        dispatch
    )

    const _openDrawer = () => {
        dispatchSetDrawer(true)
    }

    const _closeDrawer = () => {
        dispatchSetDrawer(false)
    }

    useEffect(() => {
        if (drawerEl && drawerEl.current) {
            if (drawer) {
                drawerEl.current.openDrawer()
            } else {
                drawerEl.current.closeDrawer()
            }
        }
    }, [drawer])

    const _renderNavigationView = () => (
        <View style={style.nav}>
            <ListItem icon>
                <Left>
                    <Button transparent>
                        <Icon active name="options" />
                    </Button>
                </Left>
                <Body>
                    <Button transparent>
                        <Text>Pengaturan</Text>
                    </Button>
                </Body>
                <Right></Right>
            </ListItem>

            <ListItem icon>
                <Left>
                    <Button transparent onPress={dispatchLogOut}>
                        <Icon active name="log-out" />
                    </Button>
                </Left>
                <Body>
                    <Button transparent onPress={dispatchLogOut}>
                        <Text>Keluar</Text>
                    </Button>
                </Body>
                <Right></Right>
            </ListItem>
        </View>
    )

    return (
        <View style={{ flex: 1 }}>
            <DrawerLayout
                ref={drawerEl}
                onDrawerOpen={_openDrawer}
                onDrawerClose={_closeDrawer}
                drawerWidth={300}
                drawerPosition="right"
                drawerType="slide"
                drawerBackgroundColor="#ddd"
                renderNavigationView={_renderNavigationView}>
                <Content padder>
                    <Text>{JSON.stringify(session)}</Text>
                </Content>
            </DrawerLayout>
        </View>
    )
}
