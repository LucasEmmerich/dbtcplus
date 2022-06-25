import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flexDirection: 'column',
		backgroundColor: 'white',
		height: '95%'
	},
	welcome: {
		flexDirection: 'column',
		alignSelf: 'center',
		justifyContent: 'flex-end',
		paddingVertical: 40
	},
	title:{
		fontFamily: 'Montserrat',
		textAlign: 'center'
	},
	logo: {
		alignItems: 'center'
	},
	form: {
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	buttons: {
		flexDirection: 'column',
		alignItems: 'center',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	font:{
		fontFamily: 'Montserrat',
	}

})