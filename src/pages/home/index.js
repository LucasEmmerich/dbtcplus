import React from 'react';
import { View, Alert, Text, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import GlucoseRecordService from '../../services/glucose-record-service';
import { DataTable } from 'react-native-paper';
import style from './style.js';
import GlucoseRecord from '../../model/glucose_record';
import CustomTextInput from '../../components/custom-inputs/text-input/custom-text-input';
import GlucoseRecordDataTableRow from '../../components/glucose-record/glucose-record';
import Loader from '../../components/loader/loader';
import CustomCheckBox from '../../components/custom-inputs/check-box/custom-check-box';
import logo from '../../assets/logo.png';

export default function Home() {
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
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
        getPageData();
    }, [page]);


    return (
        <View style={{ ...style.container, marginTop: Constants.statusBarHeight }}>
            <View style={{ flexDirection: 'row', justifyContent:'center',alignItems:'center'}}>
                <Image source={logo} style={{ width: 100, height: 100 }} />
                <Text style={{fontWeight:'700',textAlignVertical:'center',textAlign:'center'}}>Bom dia, Lucas Araujo Emmerich...</Text>
            </View>
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
                newRegister.glr_wasThereConsumption === true &&
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
                <TouchableOpacity onPress={create} style={style.createButtom}>
                    <Text>create</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Loader isLoading={false}>
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