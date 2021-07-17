import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    label: {
        fontWeight: '700',
        textAlignVertical: 'center',
        paddingHorizontal: 5
    },
    input: {
        borderWidth: 1,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        paddingLeft: 4,
        backgroundColor: 'white',
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