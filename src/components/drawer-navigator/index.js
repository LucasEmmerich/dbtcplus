import { createDrawerNavigator } from '@react-navigation/drawer';

import GlucoseDiary from '../../pages/glucose-diary';
import DoseCalculator from '../../pages/dose-calculator';
import Main from '../../pages/main';
import React from 'react'
import RegisterGlucose from '../../pages/register-glucose';
import CustomDrawerContent from '../custom-drawer-content';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeFive from 'react-native-vector-icons/FontAwesome5';

const Drawer = createDrawerNavigator();

const CustomDrawerNavigator = () => {
	const drawerItems = [
		{
			key: 'RegisterGlucose',
			name: 'RegisterGlucose',
			route: { nav: 'SideMenuDrawer', routeName: 'RegisterGlucose', title: 'Registrar dose' },
			drawerIcon: (() => <FontAwesomeFive name='pen-alt' size={30} color="#F96B70" />)
		},
		{
			key: 'DoseCalculator',
			name: 'DoseCalculator',
			route: { nav: 'SideMenuDrawer', routeName: 'DoseCalculator', title: 'Calculadora de dose' },
			drawerIcon: (() => <Ionicons name="calculator" size={30} color="#F96B70" />)
		},
		{
			key: 'GlucoseDiary',
			name: 'GlucoseDiary',
			route: { nav: 'SideMenuDrawer', routeName: 'GlucoseDiary', title: 'Histórico' },
			drawerIcon: (() => <Icon name="history" size={30} color="#F96B70" />)

		},
	];

	const ReloadedGlucoseDiary = () => {
		//force update
		return <GlucoseDiary />
	}

	return (
		<Drawer.Navigator
			initialRouteName="Home"
			drawerContent={(props) => (
				<CustomDrawerContent drawerItems={drawerItems} {...props} />
			)}
			screenOptions={{ headerShown: false }}
		>
			<Drawer.Screen name="Main" component={Main} />
			<Drawer.Screen name="RegisterGlucose" component={RegisterGlucose} />
			<Drawer.Screen name="DoseCalculator" component={DoseCalculator} />
			<Drawer.Screen name="GlucoseDiary" component={ReloadedGlucoseDiary} />
		</Drawer.Navigator>
	);
}

export default CustomDrawerNavigator	
