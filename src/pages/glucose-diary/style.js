import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center'
	},
	listGlucoseRegister: {
		flex: 0.9,
		width: '90%',

	},
	listGlucoseRegisterContainer: {
		alignItems: 'center',
	},
	glucoseRegister: {
		width: '90%',
		height: 80,
		justifyContent: 'space-around',

		marginLeft: 2,
		marginRight: 2,
		padding: 6,
		marginTop: 10,
		marginBottom: 4,
		borderStyle: 'solid',
		borderRadius: 8,
		backgroundColor: 'white',

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,
		elevation: 7,
	},
	data: {
		alignSelf: 'center'
	},
	row: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around'
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
});