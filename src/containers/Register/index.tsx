import React, { useState, useEffect } from 'react'
import { View, Content, Button, Text, Form, Item, Label, Input, DatePicker, Textarea, Toast } from 'native-base'
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import * as Location from 'expo-location'

import { userCreate } from '../../store/user/effects'
import { logIn, sessionFetch } from '../../store/app/effects'
import { validateEmail, validatePhone } from '../../utils/validator'

import style from './style'

export default function Register({ navigation }: any) {
    const [location, setLocation] = useState({ coords: { latitude: 0, longitude: 0 } } as any)

    const _setLocation = async () => {
        const locationEnabled = await Location.hasServicesEnabledAsync()
        const { status } = await Location.requestPermissionsAsync()
        if (!(locationEnabled && status === 'granted')) {
            alert(
                'Lokasi diperlukan untuk melanjutkan pendaftaran, buka pengaturan dan izinkan aplikasi ini untuk mendapatkan lokasi Anda.'
            )
            navigation.goBack()
        }

        const location = await Location.getCurrentPositionAsync({})
        setLocation(location as any)
    }

    useEffect(() => {
        _setLocation()
    }, [])

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phone: '',
        dob: null,
        address: ''
    })
    const [error, setError] = useState({
        name: false,
        email: false,
        password: false,
        phone: false,
        dob: false,
        address: false
    })
    const validator: any = {
        name: form.name,
        email: form.email && validateEmail(form.email),
        password: !form.rePassword ? form.password : form.password === form.rePassword,
        phone: form.phone && validatePhone(form.phone),
        dob: form.dob && (form.dob as any).toISOString(),
        address: form.address
    }

    const _setField = (field: string) => (value: string) => {
        setError((prev) => ({ ...prev, [field]: false }))
        setForm((prev) => ({ ...prev, [field]: value }))
    }
    const _setError = (field: string) => () => {
        setError((prev) => ({ ...prev, [field]: !validator[field] }))
    }

    const _setDOBField = (selectedDate: any) => {
        const currentDate = selectedDate || form.dob

        _setField('dob')(currentDate)
    }

    const dispatch = useDispatch()
    const { dispatchUserCreate, dispatchLogIn, dispatchSessionFetch }: any = bindActionCreators(
        { dispatchUserCreate: userCreate, dispatchLogIn: logIn, dispatchSessionFetch: sessionFetch },
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
            if (field !== 'rePassword') {
                setError((prev) => ({ ...prev, [field]: !validator[field] }))
                if (!validator[field]) {
                    hasError = true
                }
            }
        }

        if (hasError) {
            return
        }

        try {
            await dispatchUserCreate({
                name: form.name,
                email: form.email,
                password: form.password,
                phone: form.phone,
                dob: (form.dob as any).toISOString(),
                address: form.address,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
            await dispatchLogIn({ email: form.email, password: form.password })
            dispatchSessionFetch()
        } catch (err) {
            return _renderToast(err)
        }
    }

    const _login = () => {
        navigation.navigate('Login')
    }

    return (
        <Content padder>
            <Form>
                <View style={style.field}>
                    <Item floatingLabel error={error.name}>
                        <Label>Nama *</Label>
                        <Input value={form.name} onChangeText={_setField('name')} onBlur={_setError('name')} />
                    </Item>
                </View>
                <View style={style.field}>
                    <Item floatingLabel error={error.email}>
                        <Label>Email *</Label>
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
                        <Label>Password *</Label>
                        <Input
                            secureTextEntry
                            value={form.password}
                            onChangeText={_setField('password')}
                            onBlur={_setError('password')}
                        />
                    </Item>
                </View>
                <View style={style.field}>
                    <Item floatingLabel error={error.password}>
                        <Label>Ulangi password *</Label>
                        <Input
                            secureTextEntry
                            value={form.rePassword}
                            onChangeText={_setField('rePassword')}
                            onBlur={_setError('password')}
                        />
                    </Item>
                </View>
                <View style={style.field}>
                    <Item floatingLabel error={error.phone}>
                        <Label>No. Telfon *</Label>
                        <Input
                            autoCompleteType="tel"
                            keyboardType="phone-pad"
                            value={form.phone}
                            onChangeText={_setField('phone')}
                            onBlur={_setError('phone')}
                        />
                    </Item>
                </View>
                <View style={style.field}>
                    <Label>Tanggal lahir *</Label>
                    <View style={!error.dob ? style.fieldBorder : style.fieldBorderError}>
                        <DatePicker
                            defaultDate={new Date()}
                            locale={'id'}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={'fade'}
                            androidMode={'default'}
                            placeHolderText="D/M/YYYY"
                            placeHolderTextStyle={{ color: '#d3d3d3' }}
                            onDateChange={_setDOBField}
                            disabled={false}
                        />
                    </View>
                </View>
                <View style={style.field}>
                    <Label>Alamat *</Label>
                    <View style={!error.address ? style.fieldBorder : style.fieldBorderError}>
                        <Textarea
                            rowSpan={3}
                            value={form.address}
                            onChangeText={_setField('address')}
                            onBlur={_setError('address')}
                            underline={false}
                            bordered={false}
                        />
                    </View>
                </View>
            </Form>
            <View style={style.buttonWrapper}>
                <Button block primary onPress={_submitForm}>
                    <Text>Daftar</Text>
                </Button>
            </View>
            <View>
                <Button block transparent onPress={_login}>
                    <Text>Sudah punya akun? login di sini</Text>
                </Button>
            </View>
        </Content>
    )
}
