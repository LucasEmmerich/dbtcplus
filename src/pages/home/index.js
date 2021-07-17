import React from 'react';
import { View, Alert, StyleSheet, TextInput, Text, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import GlucoseRecordService from '../../services/glucose-record-service';
import { DataTable } from 'react-native-paper';
import style from './style.js';
import GlucoseRecord from '../../model/glucose_record';
import CustomInput from '../../components/custom-input/custom-input';
import GlucoseRecordDataTableRow from '../../components/glucose-record/glucose-record';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const getNumberOfPages = () => Math.ceil((pagination.total / itemsPerPage));
    const [newRegister, setNewRegister] = useState(new GlucoseRecord());
    const [pagination, setPagination] = useState({
        from: page,
        to: itemsPerPage,
        total: 0,
        data: []
    });

    const showConfirmRemoveDialog = (id) => {
        Alert.alert(
            "Atenção!",
            "Tem certeza que quer remover esse registro?",
            [
                { text: "Sim", onPress: () => remove(id) },
                { text: "Não", },
            ]
        );
    };

    const getPageData = async () => {
        const glucoseService = new GlucoseRecordService();
        const data = await glucoseService.listWithPagination(page, itemsPerPage);
        setPagination(data);
    };

    const create = async () => {
        const glucoseService = new GlucoseRecordService();
        await glucoseService.create(newRegister);
        getPageData();
    };

    const remove = async (id) => {
        const glucoseService = new GlucoseRecordService();
        await glucoseService.delete(id);
        getPageData();
    };

    useEffect(() => {
        getPageData()
    }, [page]);


    return (
        <View style={{ ...style.container, marginTop: Constants.statusBarHeight }}>
            <View style={style.row}>
                <CustomInput
                    label={'Glicose:'}
                    style={{ width: 55 }}
                    placeholder={'ex: 120'}
                    metric={'mg/Dl'}
                    type={'number'}
                    onChange={(value) => {
                        setNewRegister({
                            ...newRegister,
                            glr_mg_per_dl: value
                        })
                    }}
                />
                <TouchableOpacity onPress={create} style={{ margin: 5 }}>
                    <Text>create</Text>
                </TouchableOpacity>
            </View>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={style.dataTableHeader}>Mg/Dl</Text>
                    </DataTable.Title>
                    <DataTable.Title style={{ flex: 4, justifyContent: 'center' }}>
                        <Text style={style.dataTableHeader}>Registrado em</Text>
                    </DataTable.Title>
                    <DataTable.Title style={{ flex: 1, justifyContent: 'center' }}>
                        <Text></Text>
                    </DataTable.Title>
                    <DataTable.Title style={{ flex: 1, justifyContent: 'center' }}>
                        <Text></Text>
                    </DataTable.Title>
                </DataTable.Header>
                <View style={style.dataTable}>
                    {
                        pagination.data.map(data => {
                            data.onDelete = () => showConfirmRemoveDialog(data.glr_id);
                            return <GlucoseRecordDataTableRow data={data} />
                        })
                    }
                </View>
                <DataTable.Pagination
                    page={page}
                    numberOfPages={getNumberOfPages()}
                    onPageChange={page => setPage(page)}
                    label={`${pagination.from + (pagination.total === 0 ? 0 : 1)} - ${pagination.to} de ${pagination.total}`}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                />
            </DataTable>
        </View>
    );
}