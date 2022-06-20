import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    mainButton: {
        width: '85%',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: 'black',
        borderWidth: 0.3,
        borderRadius: 8,
        padding: 6,
        margin: 4,
        backgroundColor: '#F96B70',
    },
    mainButtonText:{
        color: 'white',
        fontWeight: 'bold',
    },
    item: {
        width: '85%',
        alignSelf: 'center',
        padding: 5,
        borderColor: 'black',
        backgroundColor: '#F96B70',
        borderWidth: 1
    },
    itemText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    input: {
        width: '85%',
        alignSelf: 'center',
        height: 40,
        paddingLeft: 10,
        borderColor: 'black',
        borderWidth: 1
    },
    label: {
        fontWeight: 'bold',
        width: '85%',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 15
    }
})