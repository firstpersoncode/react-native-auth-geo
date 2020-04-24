import React, { useState } from 'react'
import { View, Content, Button, Text, Form, Item, Label, Input, Toast } from 'native-base'
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'

import { userResetPassword } from '../../store/user/effects'

import style from './style'

export default function ForgotPassword({ navigation }: any) {
    const [error, setError] = useState(false)
    const [email, setEmail] = useState('')

    const _setField = (value: string) => {
        setError(false)
        setEmail(value)
    }

    const _setError = () => {
        setError(!email)
    }

    const dispatch = useDispatch()
    const { dispatchUserResetPassword }: any = bindActionCreators(
        {
            dispatchUserResetPassword: userResetPassword
        },
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
        _setError()

        if (!email) {
            return
        }

        try {
            await dispatchUserResetPassword(email)
            alert('Kami telah mengirimkan password baru ke email: ' + email)
            navigation.navigate('Login')
        } catch (err) {
            return _renderToast(err)
        }
    }

    return (
        <Content padder>
            <Form>
                <Text style={style.notif}>
                    Kami akan mengirimkan password baru ke email Anda. Harap masukkan email yang Anda daftarkan.
                </Text>
                <View style={style.field}>
                    <Item floatingLabel error={error}>
                        <Label>Email</Label>
                        <Input
                            autoCompleteType="email"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={_setField}
                            onBlur={_setError}
                        />
                    </Item>
                </View>
            </Form>
            <View style={style.buttonWrapper}>
                <Button full primary onPress={_submitForm}>
                    <Text>Atur ulang password</Text>
                </Button>
            </View>
        </Content>
    )
}
