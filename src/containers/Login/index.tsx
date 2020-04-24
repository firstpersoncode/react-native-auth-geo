import React, { useState, useEffect } from 'react'
import { View, Content, Button, Text, Form, Item, Label, Input, Toast } from 'native-base'
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'

import { logIn, sessionFetch } from '../../store/app/effects'
import { validateEmail } from '../../utils/validator'

import style from './style'

export default function Login({ navigation }: any) {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState({
        email: false,
        password: false
    })
    const validator: any = {
        email: form.email && validateEmail(form.email),
        password: form.password
    }

    const _setField = (field: string) => (value: string) => {
        setError((prev) => ({ ...prev, [field]: false }))
        setForm((prev) => ({ ...prev, [field]: value }))
    }
    const _setError = (field: string) => () => {
        setError((prev) => ({ ...prev, [field]: !validator[field] }))
    }

    const dispatch = useDispatch()
    const { dispatchLogIn, dispatchSessionFetch }: any = bindActionCreators(
        { dispatchLogIn: logIn, dispatchSessionFetch: sessionFetch },
        dispatch
    )

    const _renderToast = (err: any) =>
        err.message &&
        Toast.show({
            type: 'danger',
            text: err.message,
            buttonText: 'Tutup',
            duration: 10000
        })

    const _submitForm = async () => {
        let hasError = false
        for (const field in form) {
            setError((prev) => ({ ...prev, [field]: !validator[field] }))
            if (!validator[field]) {
                hasError = true
            }
        }

        if (hasError) {
            return
        }

        try {
            await dispatchLogIn(form)
            dispatchSessionFetch()
        } catch (err) {
            return _renderToast(err)
        }
    }

    const _register = () => {
        navigation.navigate('Register')
    }

    const _forgotPassword = () => {
        navigation.navigate('ForgotPassword')
    }

    return (
        <Content padder>
            <Form>
                <View style={style.field}>
                    <Item floatingLabel error={error.email}>
                        <Label>Email</Label>
                        <Input
                            autoCompleteType="email"
                            keyboardType="email-address"
                            value={form.email}
                            onChangeText={_setField('email')}
                            onBlur={_setError('email')}
                        />
                    </Item>
                </View>
                <View style={style.field}>
                    <Item floatingLabel error={error.password}>
                        <Label>Password</Label>
                        <Input
                            secureTextEntry
                            value={form.password}
                            onChangeText={_setField('password')}
                            onBlur={_setError('password')}
                        />
                    </Item>
                </View>
            </Form>
            <View style={style.buttonWrapper}>
                <Button block primary onPress={_submitForm}>
                    <Text>Masuk</Text>
                </Button>
            </View>
            <View>
                <Button block transparent onPress={_forgotPassword}>
                    <Text>Lupa password</Text>
                </Button>
                <Button block transparent onPress={_register}>
                    <Text>Belum punya akun? daftar di sini</Text>
                </Button>
            </View>
        </Content>
    )
}
