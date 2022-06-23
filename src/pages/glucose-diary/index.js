import { View, Text, Pressable, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import style from './style';

import GlucoseRecordService from '../../services/glucose-record-service';
import Header from '../../components/header';

const GlucoseDiary = () => {
	const [glucoseRecordService, setGlucoseRecordService] = useState(new GlucoseRecordService())
	const [page, setPage] = useState(1)
	const [glucoseRegisters, setGlucoseRegisters] = useState([])

	const getGlucoseRegisters = async () => {
		const newGlucoseRegisters = await glucoseRecordService.listWithPagination(page)

		if (newGlucoseRegisters.length > 0) {
			setGlucoseRegisters(glucoseRegisters.concat(newGlucoseRegisters))
		}
	};

	useEffect(() => {
		getGlucoseRegisters();
	}, []);

	return (
		<>
			<Header />
			<View style={style.container}>
				<ScrollView style={style.listGlucoseRegister} contentContainerStyle={style.listGlucoseRegisterContainer}>
					{glucoseRegisters.map((value, index) => {
						return (
							<View key={index} style={style.glucoseRegister}>
								<Text style={style.data}>{value.created_at}</Text>
								<Text >Consumação: {value.consumption}</Text>
								<View style={style.row}>
									<Text>Glicose: {value.mg_per_dl}</Text>
									<Text>Doses utilizada: {value.insulin_doses_used}</Text>
								</View>

							</View>
						)
					})}
				</ScrollView>

				<View style={style.buttons}>
					<Pressable style={{ ...style.button, ...style.defaultButton }}
						onPress={() => {
							setPage(page + 1)
							getGlucoseRegisters()
						}}>
						<Text style={{ color: 'white', fontWeight: 'bold', ...style.fontSizeButton }}>Carregar mais</Text>
					</Pressable>
				</View>
			</View>
		</>
	)
}

export default GlucoseDiary;