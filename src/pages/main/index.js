import React, { useEffect } from 'react';
import { View, Text, BackHandler } from 'react-native';
import style from './style';

import Card from '../../components/cards';
import Header from '../../components/header';
import Button from '../../components/button';
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