import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		backgroundColor: 'white',
		height: '95%'
	},
	title: {
		textAlign: 'center',
		color: '#F96B70',
		fontSize: 20,
		fontWeight: 'bold',
		marginHorizontal: 30
	},
	glucoseRegister: {
		justifyContent: 'space-around',
		paddingHorizontal: 10,
		backgroundColor: '#F96B70',
		width: '90%',
		height: 80,
		alignSelf: 'center',
		borderStyle: 'solid',
		borderRadius: 8,
		margin: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,
		elevation: 7
	},
	label: {
		fontWeight: 'bold',
		color: 'white'
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
});