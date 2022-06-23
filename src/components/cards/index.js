import { View, Text } from 'react-native'
import { useState } from 'react'
import React from 'react'
import style from './style'
import SVGDrop from '../../assets/icon-drop'

export default function Card() {
	const [media, setMedia] = useState(100)
	const [evaluation, setEvaluation] = useState('Seus números estão bons!')
	return (
		<View style={style.container}>
			<View style={style.card}>
				<View style={style.containerFirstText}>
					<Text style={style.firstText}>Sua glicose média hoje</Text>
					<SVGDrop width="20" height="17" />

				</View>
				<View style={style.mediaGlucose}>
					<Text style={style.media}>{media} </Text>
					<Text style={style.metric}>mg/dl</Text>

				</View>
				<Text style={style.secondText}>{evaluation}</Text>

			</View>
		</View>
	)
}