import React from 'react';
import { View, Text } from 'react-native';
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
	return (
		<>
			<Header hideBackButton update/>
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