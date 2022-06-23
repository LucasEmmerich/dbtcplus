import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Constants.statusBarHeight,
        backgroundColor: '#F96B70',
        padding: 8
    },
    nameLabel: {
        fontWeight: '900',
        textAlignVertical: 'center',
        textAlign: 'center',
        color: 'white',
        fontSize: 17,
        paddingRight: 10
    },
    rightContainer: { 
        flexDirection: 'row',
        width: '50%', 
        justifyContent: "flex-end" 
    },
    leftContainer: { 
        flexDirection: 'row',
        width: '50%', 
        justifyContent: "flex-start" 
    }
})