import { StyleSheet } from "react-native"

export default StyleSheet.create({
	container: {
		backgroundColor: 'white',
		width: 260,
		height: 225,

		borderStyle: 'solid',
		borderRadius: 24,
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 10,

		justifyContent: 'center',
		alignItems: 'center'

	},
	card: {
		width: '80%',
		height: '70%',
		alignItems: "flex-start",
		justifyContent: "flex-start",

	},
	firstText: {
		fontSize: 17,
	},
	containerFirstText: {
		flex: 0.3,
		alignItems: 'center',
		flexDirection: 'row',

	},
	mediaGlucose: {
		flex: 0.5,
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	media: {
		fontSize: 50
	},
	metric: {
		fontSize: 18,
		alignSelf: 'center'
	},
	secondText: {
		fontSize: 17,
		color: '#F96B70'
	}

})