import { View, Text, Pressable } from 'react-native'
import React from 'react'
import style from './style'
import Card from '../../components/cards'

export default function Main({ navigation }) {
	const goToRegisterGlucose = () => {
		navigation.navigate('RegisterGlucose')
	}
	return (
		<View style={style.container}>
			<Text></Text>
			<View style={style.carrousel}>
				<Card></Card>
				<Card></Card>

			</View>
			<View style={style.buttons}>

				<Pressable style={{ ...style.button, ...style.defaultButton }}
					onPress={goToRegisterGlucose}>
					<Text style={{ color: 'white', fontWeight: 'bold', ...style.fontSizeButton }}>Registrar refeição</Text>
				</Pressable>
			</View>
		</View>
	)
}