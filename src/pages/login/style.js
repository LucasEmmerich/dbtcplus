import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-evenly',
		flexDirection: 'column',
		alignItems: 'center',
		paddingBottom: 50
	},
	welcome: {
		flexDirection: 'column',
		alignSelf: 'center',
		justifyContent: 'flex-end',
		flex: 0.5
	},
	button: {
		flexWrap: 'nowrap',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
		borderStyle: 'solid',
		height: 41,
		minWidth: '90%'
	},
	defaultButton: {
		backgroundColor: '#F96B70'
	},
	customButtonLogin: {
		backgroundColor: '#fff',
		borderColor: '#29333F',
		borderWidth: 1,
		marginBottom: 10
	},
	buttonContainer: {
		justifyContent: 'flex-end',
		flex: 0.4
	},
	buttons: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-around',
		flex: 0.43

	},
	font: {
	},
	subtitle: {
		fontSize: 16,
		textAlign: 'center',
		fontWeight: "600"
	},
	title: {
		fontSize: 40,
		fontWeight: 'bold'
	},
	fontSizeButton: {
		fontSize: 15
	},
	row: {
		flexDirection: 'row'
	}
})