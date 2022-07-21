import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
	},

	form: {
		flexDirection: "column",
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '90%',
		alignSelf: 'center',
		flex: 0.5
	},
	itemForm: {
		width: '100%',
		paddingTop: 10
	},
	checkbox: {
		alignSelf: 'flex-start',
		paddingLeft: 20
	},
	buttons: {
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

	errors: {
		borderColor: 'red',
		borderStyle: 'solid',
		borderWidth: 2,
		borderRadius: 8,
		padding: 15,
		width: '77%',
		alignSelf: 'center',
		marginTop: 10
	},
	error: {
		color: 'red',
		flexWrap: 'wrap',
		marginBottom: 10
	},

	comboDiv: {
		position: 'absolute',
		minWidth: '85%',
		alignSelf: 'center',
		backgroundColor: '#F96B70',
		zIndex: 99,
		maxHeight: 95
	},
	comboItem: {
		padding: 5,
		color: 'white',
		height: 30,
		fontWeight: 'bold',
		borderColor: '#b06a66',
		borderWidth: 1,
		borderBottomWidth: 0
	}
});