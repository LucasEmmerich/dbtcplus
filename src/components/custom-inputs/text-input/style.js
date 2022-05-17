import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    row: {
        padding: 3,
        paddingBottom: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
    },

    label: {
        fontWeight: '700',
        textAlignVertical: 'center'
    },
    input: {
        padding: 3,
        backgroundColor: 'white',
        textAlign: 'left',
        flex: 1,
        color: '#76BFAC'
    },
    metric: {
        backgroundColor: 'lightgrey',
        borderWidth: 1,
        fontSize: 12,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        textAlignVertical: 'center',
        padding: 3,
        fontWeight: '700'
    }
});