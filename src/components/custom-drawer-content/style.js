import { StyleSheet } from "react-native";

export default StyleSheet.create({
	headerContainer: {
		height: 100,
		flexDirection: 'row',
		paddingVertical: 28,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logo: {
		width: 100,
		height: 75,
	},
	drawerContainer: {
		backgroundColor: 'white',
	},
	container: {
		flex: 1,
		zIndex: 1000,
	},
	centered: {
		alignItems: 'center',
	},
	parentItem: {
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 2,
		borderBottomColor: '#F96B70',
		paddingTop: 4,
		paddingBottom: 4,
		paddingLeft: 5
	},
	title: {
		margin: 10,
		fontWeight: 'bold',
		color: 'black',
		textAlign: 'center',
	},
	logoContainer: {
		flex: 1,
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 10
	}
});
