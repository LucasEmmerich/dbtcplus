import React, { useEffect } from 'react';
import { View, Text, BackHandler } from 'react-native';
import style from './style';

import Card from '../../components/cards';
import Header from '../../components/header';
import Button from '../../components/button';

export default function Main({ navigation }) {
	const goToRegisterGlucose = () => {
		navigation.navigate('RegisterGlucose')
	}
	const goToDoseCalculator = () => {
		navigation.navigate('DoseCalculator')
	}
	const goToGlucoseDiary = () => {
		navigation.navigate('GlucoseDiary')
	}

	const backAction = () => {
		BackHandler.exitApp()
		return true;
	};

	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", backAction);

		return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
	}, []);

	return (
		<>
			<Header hideBackButton key={Date.now()} />
			<View style={style.container}>
				<Text></Text>
				<View style={style.carrousel}>
					<Card></Card>
					<Card></Card>

				</View>
				<View style={style.buttons}>
					<Button onPress={goToRegisterGlucose} title={'Registrar refeição'} />
					<Button onPress={goToDoseCalculator} title={'Calcular Dose'} />
					<Button onPress={goToGlucoseDiary} title={'Histórico'} />
				</View>
			</View>
		</>
	)
}