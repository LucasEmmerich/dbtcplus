import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import RegisterGlucose from '../register-glucose/'

export default function Main() {
	const backAction = () => {
		BackHandler.exitApp()
		return true;
	};

	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", backAction);

		return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
	}, []);

	return (
		<RegisterGlucose />
	)
}