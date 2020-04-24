import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1'
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center'
    },
    mapContainer: {
        // position: 'absolute',
        // left: 0,
        // top: 0,
        // right: 0,
        // bottom: '50%',
        height: 500,
        width: '100%',
        position: 'relative',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    },
    mapBar: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})
