import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
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
	searchableDropDown:{
		containerStyle: {
			width: '85%',
			alignSelf: 'center'
		},
		textInputStyle: {
			borderWidth: 1,
			borderStyle: 'solid',
			borderColor: '#C0C0C0',
			borderRadius: 8,
			height: 45,
			paddingLeft: 10,
		},
		itemStyle: {
			padding: 10,
			marginTop: 2,
			// backgroundColor: '#FAF9F8',
			borderColor: '#bbb',
			borderWidth: 1,
			backgroundColor:'red'
		}
	},
	dosageCard: {
		height: 150,
		borderRadius: 8,
		padding: 10,
		paddingTop: 0,
		paddingRight: 0,
		width: '90%',
		alignItems: 'center',
		alignSelf: 'center',
		backgroundColor: '#e0feff',
		marginTop: 10,
		marginBottom: 10,
		borderWidth: 0.01,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.00,
		elevation: 24
	},
	dosageRow: { 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'center'
	},
	dosageLabel: {
		padding: 5,
		fontWeight: 'bold'
	},
	bestDose:{
		fontWeight: '900',
		fontSize: 20,
		backgroundColor: '#05fa2a',
		width: 150,
		marginRight: 0,
		marginLeft: 'auto',
		color: 'white',
		borderTopRightRadius: 8
	}
})