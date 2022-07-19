import { SafeAreaView, ScrollView, TouchableOpacity, View, Text, Image } from 'react-native';
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import GlucometerSvg from '../../assets/glucometer.svg'

import style from './style';

const CustomDrawerContent = (props) => {
	const onItemPress = (key) => {
		const filteredDrawerRoutes = props.drawerItems.find((e) => {
			return e.key === key;
		});
		const selectedRoute = filteredDrawerRoutes.route;
		props.navigation.toggleDrawer();
		props.navigation.navigate(selectedRoute.routeName);
	}
	const renderDrawer = () => {
		return (
			<View>
				<View style={style.logoContainer}>
					<GlucometerSvg width={60} height={60} />

				</View>
				{props.drawerItems.map((parent) => (
					<View key={parent.key}>
						<TouchableOpacity
							key={parent.key}
							testID={parent.key}
							onPress={() => { onItemPress(parent.key) }}
						>
							<View style={style.parentItem}>
								{parent.drawerIcon()}
								<Text style={style.title}>{parent.route.title}</Text>
							</View>

						</TouchableOpacity>

					</View>
				))}
			</View>
		)
	}

	return (
		<ScrollView style={style.drawerContainer}>
			<SafeAreaView
				style={style.container}
				forceInset={{ top: 'always', horizontal: 'never' }}
			>
				<Icon name='history' />
				{renderDrawer()}
			</SafeAreaView>

		</ScrollView>
	)
}

export default CustomDrawerContent;
