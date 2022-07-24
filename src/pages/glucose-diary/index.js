import { View, Text, Pressable, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import style from './style';
import GlucometerSvg from '../../assets/glucometer.svg';
import InsulinPen from '../../assets/syringe-with-medication-svgrepo-com.svg';

import GlucoseRecordService from '../../services/glucose-record-service';
import Header from '../../components/header';
import Loader from '../../components/loader';
import Toast from 'react-native-toast-message';
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment';

const GlucoseDiary = () => {
	const [glucoseRecordService,] = useState(new GlucoseRecordService());
	const [page, setPage] = useState(1);
	const [glucoseRegisters, setGlucoseRegisters] = useState([]);
	const [loading, setLoading] = useState(false);
	const [dashboardData, setDashboardData] = useState(undefined);

	const getGlucoseRegisters = async () => {
		try {
			setLoading(true);
			const data = await glucoseRecordService.listWithPagination(page);
			setGlucoseRegisters(glucoseRegisters.concat(data.records));
			setDashboardData(data.dashBoardData);
		}
		catch (err) {
			Toast.show({
				type: 'error',
				text1: 'Erro',
				text2: 'Houve um problema ao caregar os dados!'
			});
		}
		finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getGlucoseRegisters();
	}, [page]);

	const formatDate = (data) => {
		const formattedDate = moment(data, 'DD/MM/YYYY HH:mm');
		const todayDate = moment();
		const yesterdayDate = moment().add(-1, 'day');
		const dayBeforeYesterday = moment().add(-2, 'day');

		if (formattedDate.format('DD/MM/YYYY') === todayDate.format('DD/MM/YYYY')) {
			return `Hoje às ${formattedDate.format('HH:mm')}`;
		} else if (formattedDate.format('DD/MM/YYYY') === yesterdayDate.format('DD/MM/YYYY')) {
			return `Ontem às ${formattedDate.format('HH:mm')}`;
		} else if (formattedDate.format('DD/MM/YYYY') === dayBeforeYesterday.format('DD/MM/YYYY')) {
			return `Anteontem às ${formattedDate.format('HH:mm')}`;
		} else {
			return formattedDate.format('DD/MM/YYYY [ás] HH:mm');
		}
	};

	const RowComponent = ({ item }) => {
		return (
			<View key={item.id} style={style.glucoseRegister}>
				<Text style={{ ...style.label, alignSelf: 'center' }}>⌚ {formatDate(item.created_at)}</Text>
				<View style={style.row}>
					<View style={style.row}>
						<GlucometerSvg width={22} height={22} />
						<Text style={style.label}> {item.mg_per_dl} mg/dl</Text>
					</View>
					{
						item.was_there_consumption &&
						<View style={style.row}>
							<InsulinPen width={22} height={22} />
							<Text style={style.label}>{item.insulin_doses_used} doses utilizadas</Text>
						</View>
					}
				</View>
				{
					item.was_there_consumption &&
					<View style={style.row}>
						<Text numberOfLines={1} style={{ ...style.label }}>🍴 {item.consumption}</Text>
					</View>
				}
			</View>
		);
	}

	return (
		<>
			<Header />
			<View style={style.container}>

				{
					dashboardData &&
					<View style={style.averages}>
						<Text style={{ ...style.title,color: '#43de5c' }}>Suas Médias</Text>
						<View style={style.row}>
							{
								dashboardData.todayAverage &&
								<View style={style.averageCard}>
								<Text style={{ ...style.label, textAlign: 'center'}}>Hoje</Text>
									<Text style={{ ...style.label, fontSize: 15, textAlign: 'center' }}>🩸{dashboardData.todayAverage?.average} mg/Dl</Text>
								</View>
							}
							{
								dashboardData.weekAverage &&
								<View style={style.averageCard}>
								<Text style={{ ...style.label, textAlign: 'center'}}>Na semana</Text>
									<Text style={{ ...style.label, fontSize: 15, textAlign: 'center' }}>🩸{dashboardData.weekAverage?.average} mg/Dl</Text>
								</View>
							}
							{
								dashboardData.monthAverage &&
								<View style={style.averageCard}>
									<Text style={{ ...style.label, textAlign: 'center'}}>No mês</Text>
									<Text style={{ ...style.label, fontSize: 15, textAlign: 'center' }}>🩸{dashboardData.monthAverage?.average} mg/Dl</Text>
								</View>
							}
						</View>
					</View>
				}
				<Text style={style.title}>Role para baixo para carregar mais registros.</Text>
				<Loader isLoading={loading}>
					<FlatList
						style={{ height: 420, backgroundColor: 'white' }}
						onEndReachedThreshold={.5}
						onEndReached={({ distanceFromEnd }) => {
							if (distanceFromEnd < 0) return;
							setPage(page + 1);
						}}
						data={glucoseRegisters}
						renderItem={({ item }) => <RowComponent item={item} />}
					/>
				</Loader>
			</View>
		</>
	)
}

export default GlucoseDiary;