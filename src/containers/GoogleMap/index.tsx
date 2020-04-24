import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location'
import { Content, View } from 'native-base'
import MapView, { Marker } from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import { reportData } from '../../store/report/effects'

import style from './style'

export default function GoogleMap({ navigation }: any) {
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
    } as any)

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

        setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
        })
    }

    const dispatch = useDispatch()
    const { dispatchReportData }: any = bindActionCreators({ dispatchReportData: reportData }, dispatch)

    useEffect(() => {
        _setLocation()
        dispatchReportData()
    }, [])

    const { reports } = useSelector((state: any) => ({ reports: state.report.data }))

    return (
        <Content padder>
            <View style={style.mapContainer}>
                {region.latitude && region.longitude ? (
                    <MapView
                        provider="google"
                        style={style.map}
                        region={region}
                        showsCompass
                        showsMyLocationButton
                        showsUserLocation
                        loadingEnabled>
                        {reports.length
                            ? reports.map((report: any) => (
                                  <Marker coordinate={{ latitude: report.latitude, longitude: report.longitude }} />
                              ))
                            : null}
                    </MapView>
                ) : null}
            </View>
            <View style={style.mapBar}></View>
        </Content>
    )
}
