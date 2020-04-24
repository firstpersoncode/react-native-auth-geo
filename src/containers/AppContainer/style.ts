import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 10000,
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
})
