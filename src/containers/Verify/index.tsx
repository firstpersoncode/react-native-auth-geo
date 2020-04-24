import React, { useState, useEffect } from 'react'
import { View, Content, Button, Text, Form, Item, Label, Input } from 'native-base'
import { bindActionCreators } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import CountDown from 'react-native-countdown-component'

import { userVerify, userGenerateCode } from '../../store/user/effects'
import { sessionFetch } from '../../store/app/effects'

import style from './style'

export default function Verify() {
    const [error, setError] = useState(false)
    const [code, setCode] = useState('')

    const _setField = (value: string) => {
        setError(false)
        setCode(value)
    }

    const _setError = () => {
        setError(!code)
    }

    const dispatch = useDispatch()
    const { dispatchUserVerify, dispatchSessionFetch, dispatchUserGenerateCode }: any = bindActionCreators(
        {
            dispatchUserVerify: userVerify,
            dispatchSessionFetch: sessionFetch,
            dispatchUserGenerateCode: userGenerateCode
        },
        dispatch
    )

    const { session } = useSelector((state: any) => ({
        session: state.app.session
    }))

    const _submitForm = async () => {
        _setError()

        if (!code) {
            return
        }

        await dispatchUserVerify(session.publicId, code)
        dispatchSessionFetch()
    }

    const [countDown, setCountDown] = useState(true)

    const _toggleCountDown = () => setCountDown((prev) => !prev)

    const _resendCode = async () => {
        await dispatchUserGenerateCode(session.publicId)
        _toggleCountDown()
    }

    return (
        <Content padder>
            <Form>
                <Text style={style.notif}>
                    Kami telah mengirimkan kode verifikasi ke <Text style={{ color: 'blue' }}>{session.email}</Text>.
                    Periksa kotak masuk Anda.
                </Text>
                <View style={style.field}>
                    <Item floatingLabel error={error}>
                        <Label>Kode verifikasi</Label>
                        <Input value={code} onChangeText={_setField} onBlur={_setError} />
                    </Item>
                </View>
            </Form>
            <View style={style.buttonWrapper}>
                <Button full primary onPress={_submitForm}>
                    <Text>Verifikasi</Text>
                </Button>
            </View>
            <View>
                {countDown ? (
                    <CountDown
                        until={30}
                        size={20}
                        onFinish={_toggleCountDown}
                        digitStyle={{ backgroundColor: '#FFF' }}
                        digitTxtStyle={{ color: 'blue' }}
                        timeToShow={['S']}
                        timeLabels={{ s: 'Kirim ulang kode verifikasi dalam 30 detik' }}
                    />
                ) : (
                    <Button full transparent onPress={_resendCode}>
                        <Text>Kirim ulang kode verifikasi</Text>
                    </Button>
                )}
            </View>
        </Content>
    )
}
