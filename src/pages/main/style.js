import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f8f8f8',
		paddingLeft: 10,
		paddingRight: 10
	},
	carrousel: {
		flex: 0.4,
		flexDirection: 'row'
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
})