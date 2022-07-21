import { View, Text, Pressable, FlatList, TouchableWithoutFeedback } from 'react-native';
import Button from "../../components/button";
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from './style';

import CustomCheckBox from '../../components/custom-inputs/check-box'
import CustomTextInput from '../../components/custom-inputs/text-input'
import GlucoseRecord from '../../model/glucose_record'
import GlucoseRecordService from '../../services/glucose-record-service'
import Header from '../../components/header';
import Toast from 'react-native-toast-message';
import { navigate } from '../../Navigation';

export default function RegisterGlucose() {
	const [mg_per_dl, setMg_per_dl] = useState(undefined);
	const [was_there_consumption, setWas_there_consumption] = useState(false);
	const [insulin_doses_used, setInsulin_doses_used] = useState(undefined);
	const [consumption, setConsumption] = useState(undefined);
	const [consumptions, setConsumptions] = useState([]);
	const [error, setError] = useState([]);
	const [service,] = useState(new GlucoseRecordService());

	useEffect(() => {
		setError([]);
	}, [])

	const resetForm = () => {
		setMg_per_dl(undefined);
		setWas_there_consumption(false);
		setInsulin_doses_used(undefined);
		setConsumption(undefined);
		setConsumptions([]);
		setError([]);
	}

	const search = async (q) => {
		if (q.length <= 3) return;
		const data = await service.listConsumption(q);
		setConsumptions(data);
	};

	const onSelectConsumption = (value) => {
		setConsumption(value);
		setConsumptions([]);
	}

	const registerGlucose = async () => {
		try {
			const glucose_record = new GlucoseRecord({
				mg_per_dl,
				was_there_consumption,
				consumption,
				insulin_doses_used
			});

			const errors = glucose_record.errors();
			if (errors.length > 0) {
				setError(errors)
				throw new Error()
			}

			await service.create(glucose_record.getDataToService())
			Toast.show({
				type: 'success',
				text1: 'Sucesso!',
				text2: 'Registro realizado.'
			});
			resetForm();
		} catch (error) {
			Toast.show({
				type: 'info',
				text1: 'Atenção!',
				text2: 'Existem campos inválidos.'
			});
		}
	}

	return (
		<>
			<TouchableWithoutFeedback onPress={() => setConsumptions([])}>
				<View style={style.container}>
					<Header hideBackButton reload />
					<View style={style.itemForm}>
						<CustomTextInput
							value={mg_per_dl}
							label={'Glicemia'}
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
							onChange={(value) => {
								setWas_there_consumption(value);
								if (!value) {
									setConsumption('');
									setConsumptions([]);
									setInsulin_doses_used(undefined);
								}
							}}
						/>
					</View>

					<View style={style.itemForm}>
						<CustomTextInput
							enabled={was_there_consumption}
							value={consumption}
							label={'Consumação: '}
							style={{ width: 300 }}
							placeholder={'dois pedaços de bolo'}
							onChange={(value) => {
								search(value);
								setConsumption(value);
							}}
						/>
					</View>

					<View style={{ ...style.itemForm, position: 'relative' }} on>
						<FlatList
							style={style.comboDiv}
							data={consumptions}
							renderItem={({ item }) => {
								return (
									<Pressable onPress={() => onSelectConsumption(item)}
										title={item}>
										<Text style={style.comboItem}>{item}</Text>
									</Pressable>
								)
							}} />
					</View>

					<View style={style.itemForm}>
						<CustomTextInput
							enabled={was_there_consumption}
							value={insulin_doses_used}
							label={'Quantidade de doses aplicadas: '}
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

					{
						error.length > 0 &&
						<View style={style.errors}>
							{
								error.map((value, index) => {
									return (<Text style={style.error} key={index}><Icon style={style.icon} name="error" size={14} color="red" /> {value}</Text>)
								})
							}
						</View>
					}
				</View >
			</TouchableWithoutFeedback>
		</>
	)
}
