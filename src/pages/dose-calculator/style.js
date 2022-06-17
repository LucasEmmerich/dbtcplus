import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	logo: {
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	form: {
		flexDirection: 'column',
		justifyContent: 'space-around',
	},
	buttons: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-around',
        marginTop: 35
	},
	button: {
		flexWrap: 'nowrap',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
		borderStyle: 'solid',
		height: 41,
		minWidth: '55%'
	},
	defaultButton: {
		backgroundColor: '#F96B70'
	},
	fontSizeButton: {
		fontSize: 15
	},
	font: {
		fontFamily: 'Montserrat',
	},

})