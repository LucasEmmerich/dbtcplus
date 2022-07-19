import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		backgroundColor: 'white',
		height: '100%'
	},
	dosageCard: {
		height: 200,
		borderRadius: 8,
		width: '90%',
		alignItems: 'center',
		alignSelf: 'center',
		backgroundColor: '#F96B70',
		marginBottom: 10,
		borderWidth: 0.01,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.00,
		elevation: 5
	},
	dosageRow: { 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'center'
	},
	dosageLabel: {
		padding: 5,
		fontWeight: 'bold',
		color: 'white'
	},
	bestDose:{
		fontSize: 23,
		backgroundColor: '#03fc30',
		width: 30,
		marginRight: 0,
		marginLeft: 'auto',
		borderTopRightRadius: 8
	}
})