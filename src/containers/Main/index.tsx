import React from 'react'
import { Container, Content, Button, Text } from 'native-base'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logOut } from '../../store/app/effects'

import style from './style'

export default function Main() {
    const dispatch = useDispatch()
    const { dispatchLogOut }: any = bindActionCreators({ dispatchLogOut: logOut }, dispatch)

    return (
        <Container>
            <Content>
                <Text>Main Screen</Text>
                <Button full primary onPress={dispatchLogOut}>
                    <Text>Sign Out</Text>
                </Button>
            </Content>
        </Container>
    )
}
