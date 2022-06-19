import { View, Text, Pressable, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from './style'
import CustomCheckBox from '../../components/custom-inputs/check-box'
import CustomTextInput from '../../components/custom-inputs/text-input'
import GlucoseRecord from '../../model/glucose_record'

export default function RegisterGlucose() {
	const [glr_mg_per_dl, setMg_per_dl] = useState(undefined)
	const [glr_wasThereConsumption, setWasThereConsumption] = useState(false)
	const [glr_insulinDosesUsed, setInsulinDosesUsed] = useState(undefined)
	const [glr_consumption, setConsumption] = useState(undefined)
	const [error, setError] = useState([])
	const [notification, setNotification] = useState('')

	useEffect(() => {
		if (notification) {
			Alert.alert('', notification, [

				{ text: 'OK', onPress: () => setNotification('') },
			]);
		}
	}, [notification]);


	const registerGlucose = async () => {
		try {
			const registerGlucose = new GlucoseRecord({
				glr_mg_per_dl,
				glr_wasThereConsumption,
				glr_consumption,
				glr_insulinDosesUsed
			})

			const errors = registerGlucose.errors()
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
		<KeyboardAvoidingView style={style.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<ScrollView >
				<View style={style.form}>
					<View style={style.itemForm}>

						<CustomTextInput value={glr_mg_per_dl}
							label={'Glicose'}
							style={{ width: 55 }}
							placeholder={'120'}
							metric={'mg/Dl'}
							type={'number'}
							onChange={(value) => setMg_per_dl(value)}
						/>
					</View>

					<View style={{ ...style.checkbox, ...style.itemForm }}>

						<CustomCheckBox
							title={'Haverá consumo?'}
							isChecked={glr_wasThereConsumption}
							style={{ width: 55 }}
							onChange={(value) => setWasThereConsumption(value)}
						/>
					</View>
					<View style={style.itemForm}>

						<CustomTextInput
							enabled={glr_wasThereConsumption}
							value={glr_consumption}
							label={'Consumação: '}
							style={{ width: 300 }}
							placeholder={'dois pedaços de bolo'}
							type={'text'}
							onChange={(value) => setConsumption(value)}
						/>
					</View>

					<View style={style.itemForm}>

						<CustomTextInput
							enabled={glr_wasThereConsumption}
							value={glr_insulinDosesUsed}
							label={'Quantidade de doses aplicada: '}
							style={{ width: 300 }}
							placeholder={'15'}
							type={'number'}
							onChange={(value) => setInsulinDosesUsed(value)}
						/>
					</View>


					<View style={{ ...style.buttons, ...style.itemForm }}>
						<Pressable style={{ ...style.button, ...style.defaultButton }}
							onPress={registerGlucose}>
							<Text style={{ color: 'white', fontWeight: 'bold', ...style.fontSizeButton }}>Registrar</Text>
						</Pressable>
					</View>
				</View>

				{error.length > 0 && <View style={style.errors}>
					{error.map((value, index) => {
						return (<Text style={style.error} key={index}><Icon style={style.icon} name="error" size={14} color="red" /> {value}</Text>)
					})
					}
				</View>}

			</ScrollView >

		</KeyboardAvoidingView >
	)
}
