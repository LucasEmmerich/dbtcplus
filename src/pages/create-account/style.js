import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#fff'
	},
	logo: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		flex: 0.2
	},
	form: {
		flexDirection: 'column',
		justifyContent: 'space-around',
		flex: 0.25
	},
	buttons: {
		flex: 0.2,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-around'
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
		fontFamily: 'Montserrat'
	}

})