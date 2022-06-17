import { View, Text, Pressable, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import style from '../main/style'
import CustomCheckBox from '../../components/custom-inputs/check-box'
import CustomTextInput from '../../components/custom-inputs/text-input'
import GlucoseRecord from '../../model/glucose_record'

export default function RegisterGlucose() {
	const [newRegister, setNewRegister] = useState(new GlucoseRecord())
	const [error, setError] = useState([])
	const [notification, setNotification] = useState('')

	const setConsumption = (value) => {
		setNewRegister({ ...newRegister, glr_wasThereConsumption: value })
		console.log(value)
		console.log(newRegister)
	}

	useEffect(() => {
		if (notification) {
			Alert.alert('', notification, [
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
				{ text: 'OK', onPress: () => console.log('OK Pressed') },
			]);
		}
	}, [notification])


	const registerGlucose = async () => {
		try {
			const errors = newRegister.errors()
			if (errors.length > 0) {
				console.log(errors)
				setError(errors)
				throw new Error('Há campos inválidos')
			} else {
				setError(['não tem erro filho da puta'])
			}


		} catch (error) {
			console.log(error)
			setNotification(error.message)
		}
	}
	return (
		<View style={style.container}>
			<CustomTextInput value={newRegister.glr_mg_per_dl}
				label={'Glicose'}
				style={{ width: 55 }}
				placeholder={'120'}
				metric={'mg/Dl'}
				type={'number'}
				onChange={(value) => {
					setNewRegister({
						...newRegister, glr_mg_per_dl: value
					})
				}} />
			<CustomCheckBox
				title={'Haverá consumo?'}
				isChecked={newRegister.glr_wasThereConsumption}
				style={{ width: 55 }}
				onChange={setConsumption}
			/>
			<CustomTextInput
				enabled={newRegister.glr_wasThereConsumption}
				value={newRegister.glr_consumption}
				label={'Refeição: '}
				style={{ width: 300 }}
				placeholder={'dois pedaços de bolo'}
				type={'text'}
				onChange={(value) => {
					setNewRegister({
						...newRegister,
						glr_consumption: value
					})
				}
				}
			/>
			<CustomTextInput
				enabled={newRegister.glr_wasThereConsumption}
				value={newRegister.glr_insulinDosesUsed}
				label={'Quantidade de doses aplicada: '}
				style={{ width: 300 }}
				placeholder={'15'}
				type={'number'}
				onChange={(value) => {
					setNewRegister({
						...newRegister,
						glr_insulinDosesUsed: value
					})
				}
				}
			/>

			<View style={style.buttons}>
				<Pressable style={{ ...style.button, ...style.defaultButton }}
					onPress={registerGlucose}>
					<Text style={{ color: 'white', fontWeight: 'bold', ...style.fontSizeButton }}>Registrar</Text>
				</Pressable>
			</View>

			{error.map((value) => {
				return (<Text key={value}>{value}</Text>)
			})
			}
		</View>
	)
}
