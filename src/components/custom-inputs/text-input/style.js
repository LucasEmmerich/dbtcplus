import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    textInput: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    defaultTextInput: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#C0C0C0',
        borderRadius: 8,
        height: 45,
    },

    label: {
        fontWeight: '600',
        paddingBottom: 5,
        color: '#000'
    },
    input: {
        flex: 1,
        paddingLeft: 10,
        color: '#000'
    },
    metric: {
        display: 'flex',
        justifyContent: 'center',
        height: 44,
        borderStyle: 'solid',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: '#F96B70',
        padding: 4
    },
    textMetric: {
        fontWeight: '700',
        fontSize: 12,
        color: '#fff',

    }
});