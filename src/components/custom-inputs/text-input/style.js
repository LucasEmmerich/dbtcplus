import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    row: {
        flexDirection: 'row',
        padding: 5
    },
    label: {
        fontWeight: '700',
        textAlignVertical: 'center'
    },
    input: {
        borderWidth: 1,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        backgroundColor: 'white',
        textAlign: 'center'
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