import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		justifyContent: 'space-evenly',
		flexDirection: 'column',
		backgroundColor: 'white',
		height: '95%'
	},
	logo: {
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	buttons: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly'
	},
	button: {
		flexWrap: 'nowrap',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
		borderStyle: 'solid',
		height: 41,
		minWidth: '85%'
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