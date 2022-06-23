import { View, Text, Pressable, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from './style';

import CustomCheckBox from '../../components/custom-inputs/check-box'
import CustomTextInput from '../../components/custom-inputs/text-input'
import GlucoseRecord from '../../model/glucose_record'
import GlucoseRecordService from '../../services/glucose-record-service'
import Header from '../../components/header';

export default function RegisterGlucose() {
	const [mg_per_dl, setMg_per_dl] = useState(undefined);
	const [was_there_consumption, setWas_there_consumption] = useState(false);
	const [insulin_doses_used, setInsulin_doses_used] = useState(undefined);
	const [consumption, setConsumption] = useState(undefined);
	const [error, setError] = useState([]);
	const [notification, setNotification] = useState('');
	const [glucoseRecordService, setGlucoseRecordService] = useState(new GlucoseRecordService())

	useEffect(() => {
		if (notification) {
			Alert.alert('', notification, [

				{ text: 'OK', onPress: () => setNotification('') },
			]);
		}
	}, [notification]);

	const resetForm = () => {
		setMg_per_dl(undefined)
		setWas_there_consumption(false)
		setInsulin_doses_used(undefined)
		setConsumption(undefined)
	}

	const registerGlucose = async () => {
		try {
			const registerGlucose = new GlucoseRecord({
				mg_per_dl,
				was_there_consumption,
				consumption,
				insulin_doses_used
			})

			const errors = registerGlucose.errors()
			if (errors.length > 0) {
				console.log(errors)
				setError(errors)
				throw new Error('Há campos inválidos')
			}

			await glucoseRecordService.create(registerGlucose.getDataToService())
			setNotification('Registrado com sucesso.')
			resetForm()
		} catch (error) {
			console.log(error)
			setNotification(error.message)
		}
	}
	return (
		<>
			<Header />
			<KeyboardAvoidingView style={style.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
				<ScrollView >
					<View style={style.form}>
						<View style={style.itemForm}>

							<CustomTextInput value={mg_per_dl}
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
								isChecked={was_there_consumption}
								style={{ width: 55 }}
								onChange={(value) => setWas_there_consumption(value)}
							/>
						</View>
						<View style={style.itemForm}>

							<CustomTextInput
								enabled={was_there_consumption}
								value={consumption}
								label={'Consumação: '}
								style={{ width: 300 }}
								placeholder={'dois pedaços de bolo'}
								type={'text'}
								onChange={(value) => setConsumption(value)}
							/>
						</View>

						<View style={style.itemForm}>

							<CustomTextInput
								enabled={was_there_consumption}
								value={insulin_doses_used}
								label={'Quantidade de doses aplicada: '}
								style={{ width: 300 }}
								placeholder={'15'}
								type={'number'}
								onChange={(value) => setInsulin_doses_used(value)}
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
		</>
	)
}
