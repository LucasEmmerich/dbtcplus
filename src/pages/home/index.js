import React from 'react';
import { View, Alert, Text, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import GlucoseRecordService from '../../services/glucose-record-service';
import { DataTable, Button } from 'react-native-paper';
import GlucoseRecord from '../../model/glucose_record';
import CustomTextInput from '../../components/custom-inputs/text-input';
import GlucoseRecordDataTableRow from '../../components/glucose-record';
import Loader from '../../components/loader';
import CustomCheckBox from '../../components/custom-inputs/check-box';
import Header from '../../components/header/index';
import style from './style.js';
import { set } from 'react-native-reanimated';

export default function Home() {
    //#region Pags props
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const getNumberOfPages = () => Math.ceil((pagination.total / itemsPerPage));
    const [pagination, setPagination] = useState({
        from: page,
        to: itemsPerPage,
        total: 0,
        data: []
    });
    //#endregion

    //#region Load props
    const [isCreateLoading, setIsCreateLoading] = useState(false);
    const [isListLoading, setIsListLoading] = useState(false);
    //#endregion

    const [newRegister, setNewRegister] = useState(new GlucoseRecord());

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
        setIsListLoading(true);
        const glucoseService = new GlucoseRecordService();
        const data = await glucoseService.listWithPagination(page, itemsPerPage);
        setIsListLoading(false);
        setPagination(data);
    };

    const create = async () => {
        setIsCreateLoading(true);
        const glucoseService = new GlucoseRecordService();
        await glucoseService.create(newRegister);
        setTimeout(() => setIsCreateLoading(false), 1000);
        getPageData();
    };

    const remove = async (id) => {
        const glucoseService = new GlucoseRecordService();
        await glucoseService.delete(id);
        getPageData();
    };

    useEffect(() => {
        getPageData();
    }, [page]);


    return (
        <View style={{ ...style.container, marginTop: Constants.statusBarHeight }}>
            <Header />
            <View style={style.row}>
                <CustomTextInput
                    label={'Glicose:'}
                    style={{ width: 55 }}
                    placeholder={'120'}
                    metric={'mg/Dl'}
                    type={'number'}
                    onChange={(value) => {
                        setNewRegister({
                            ...newRegister,
                            glr_mg_per_dl: value
                        })
                    }}
                />
                <CustomCheckBox
                    label={'Houve consumo?'}
                    value={newRegister.glr_wasThereConsumption}
                    style={{ width: 55 }}
                    onChange={(value) => {
                        setNewRegister({
                            ...newRegister,
                            glr_wasThereConsumption: value
                        })
                    }}
                />
            </View>
            {
                newRegister.glr_wasThereConsumption &&
                <View>
                    <View style={style.row}>
                        <CustomTextInput
                            label={'Comeu:'}
                            style={{ width: 300 }}
                            placeholder={'dois pedaços de bolo'}
                            type={'number'}
                            onChange={(value) => {
                                setNewRegister({
                                    ...newRegister,
                                    glr_consumption: value
                                })
                            }}
                        />
                    </View>
                    <View style={style.row}>
                        <CustomTextInput
                            label={'Aplicou:'}
                            style={{ width: 55 }}
                            placeholder={'15'}
                            metric={'doses'}
                            type={'number'}
                            onChange={(value) => {
                                setNewRegister({
                                    ...newRegister,
                                    glr_insulinDosesUsed: value
                                })
                            }}
                        />
                    </View>
                </View>
            }
            <View style={style.row}>
                <Button
                    style={{ width: 150 }}
                    icon={'plus'}
                    onPress={create}
                    mode="contained"
                    color={'#00c40d'}
                    loading={isCreateLoading}>
                    Adicionar
                </Button>
            </View>
            <View>
                <Loader isLoading={isListLoading}>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={style.dataTableHeader}>Mg/Dl</Text>
                            </DataTable.Title>
                            <DataTable.Title style={{ flex: 4, justifyContent: 'center' }}>
                                <Text style={style.dataTableHeader}>Registrado em</Text>
                            </DataTable.Title>
                            <DataTable.Title style={{ flex: 2, justifyContent: 'center' }}>
                                <Text style={style.dataTableHeader}>Consumiu?</Text>
                            </DataTable.Title>
                            <DataTable.Title style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={style.dataTableHeader}></Text>
                            </DataTable.Title>
                        </DataTable.Header>
                        <View style={style.dataTable}>
                            {
                                pagination.data.map(data => {
                                    data.onDelete = () => showConfirmRemoveDialog(data.glr_id);
                                    return <GlucoseRecordDataTableRow data={data} key={data.glr_id} />
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
                </Loader>
            </View>
        </View>
    );
}