import React from 'react';
import { View, Alert, Text } from 'react-native';
import Constants from 'expo-constants';
import GlucoseRecordService from '../../services/glucose-record-service';
import { DataTable, Button, } from 'react-native-paper';
import GlucoseRecord from '../../model/glucose_record';
import CustomTextInput from '../../components/custom-inputs/text-input';
import GlucoseRecordDataTableRow from '../../components/glucose-record';
import Loader from '../../components/loader';
import CustomCheckBox from '../../components/custom-inputs/check-box';
import Header from '../../components/header/index';
import { ToastRef, Toastify } from '../../components/toast-component';
import ConsumptionModal from '../../components/consumption-modal';
import style from './style.js';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            itemsPerPage: 5,
            numberOfPages: 1,
            pagination: {
                from: 0,
                to: 0,
                total: 5,
                data: []
            },
            newRegister: new GlucoseRecord(),
            isCreating: false,
            isLoading: false
        }
    }

    _consumptionModal = React.createRef();

    clearForm = () => this.setState({ newRegister: new GlucoseRecord() });

    getNumberOfPages = () => Math.ceil((this.state.pagination.total / this.state.pagination.itemsPerPage));

    showConfirmRemoveDialog = (id) => {
        Alert.alert(
            "Atenção!",
            "Tem certeza que quer remover esse registro?",
            [
                { text: "Sim", onPress: () => this.remove(id) },
                { text: "Não", },
            ]
        );
    };

    getPageData = async () => {
        this.setState({ isLoading: true });
        const glucoseService = new GlucoseRecordService();
        const data = await <glucoseService className="listWithPaginationn"></glucoseService>(this.state.page, this.state.itemsPerPage);
        this.setState({
            pagination: data,
            numberOfPages: Math.ceil(data.total / this.state.itemsPerPage),
            isLoading: false
        });
    };

    isValid = () => {
        const errors = [];
        if (parseInt(this.state.newRegister.glr_mg_per_dl) <= 0 ||
            parseInt(this.state.newRegister.glr_mg_per_dl) >= 1000) {
            errors.push('Glicose deve ser um número entre 1 e 999');
        }
        if (this.state.newRegister.glr_wasThereConsumption === true) {
            if (this.state.newRegister.glr_consumption.length <= 3) {
                errors.push('Consumo deve ser melhor especificado');
            }
            if (this.state.newRegister.glr_insulinDosesUsed <= 0) {
                errors.push('Doses utilizadas deve ser informado');
            }
        }
        return errors;
    }

    create = async () => {
        this.setState({ isCreating: true });
        const glucoseService = new GlucoseRecordService();
        const errors = this.isValid();
        if (errors.length === 0) {
            await glucoseService.create(this.state.newRegister);
            setTimeout(() => this.setState({ isCreating: false }), 1000);
            Toastify.success('Adicionado com sucesso!');
            this.clearForm();
            await this.getPageData();
        }
        else {
            this.setState({ isCreating: false });
            Toastify.error(errors.join(';\n') + '.', 3);
        }
    };

    remove = async (id) => {
        this.setState({ isLoading: true });
        const glucoseService = new GlucoseRecordService();
        await glucoseService.delete(id);
        this.setState({ isLoading: false });
        await this.getPageData();
    };

    async componentDidMount() {
        await this.getPageData();
    }

    render() {
        return (
            <>
                <ToastRef />
                <View style={{ ...style.container, marginTop: Constants.statusBarHeight }}>
                    <Header />
                    <View>
                        <Loader isLoading={this.state.isLoading}>
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
                                        this.state.pagination.data.map(data => {
                                            data.onDelete = () => this.showConfirmRemoveDialog(data.glr_id);
                                            data.openConsumptionDetails = () => this._consumptionModal.open(data);
                                            return <GlucoseRecordDataTableRow data={data} key={data.glr_id} />
                                        })
                                    }
                                </View>
                                <DataTable.Pagination
                                    page={this.state.page}
                                    itemsPerPage={this.state.itemsPerPage}
                                    setItemsPerPage={(ipp) => { this.setState({ itemsPerPage: ipp }) }}
                                    numberOfPages={this.state.numberOfPages}
                                    onPageChange={async (page) => {
                                        this.state.page = page;
                                        await this.getPageData();
                                    }}
                                    label={`${this.state.pagination.from +
                                        (this.state.pagination.total === 0 ? 0 : 1)
                                        } - ${this.state.pagination.to} de ${this.state.pagination.total
                                        }`}
                                />
                            </DataTable>
                        </Loader>
                    </View>
                    <View style={style.row}>
                        <CustomTextInput
                            value={this.state.newRegister.glr_mg_per_dl}
                            label={'Glicose:'}
                            style={{ width: 55 }}
                            placeholder={'120'}
                            metric={'mg/Dl'}
                            type={'number'}
                            onChange={(value) => {
                                this.setState({
                                    newRegister: {
                                        ...this.state.newRegister,
                                        glr_mg_per_dl: value
                                    }
                                })
                            }}
                        />
                        <CustomCheckBox
                            label={'Haverá consumo?'}
                            value={this.state.newRegister.glr_wasThereConsumption}
                            style={{ width: 55 }}
                            onChange={(value) => {
                                this.setState({
                                    newRegister: {
                                        ...this.state.newRegister,
                                        glr_wasThereConsumption: !!value
                                    }
                                })
                            }}
                        />
                    </View>
                    <View style={{ ...style.row, opacity: this.state.newRegister.glr_wasThereConsumption ? 1 : 0.15 }}>
                        {
                            <View>
                                <View style={style.row}>
                                    <CustomTextInput
                                        enabled={this.state.newRegister.glr_wasThereConsumption}
                                        value={this.state.newRegister.glr_consumption}
                                        label={'Comeu:'}
                                        style={{ width: 300 }}
                                        placeholder={'dois pedaços de bolo'}
                                        type={'number'}
                                        onChange={(value) => {
                                            this.setState({
                                                newRegister: {
                                                    ...this.state.newRegister,
                                                    glr_consumption: value
                                                }
                                            })
                                        }}
                                    />
                                </View>
                                <View style={style.row}>
                                    <CustomTextInput
                                        enabled={this.state.newRegister.glr_wasThereConsumption}
                                        value={this.state.newRegister.glr_insulinDosesUsed}
                                        label={'Aplicou:'}
                                        style={{ width: 55 }}
                                        placeholder={'15'}
                                        metric={'doses'}
                                        type={'number'}
                                        onChange={(value) => {
                                            this.setState({
                                                newRegister: {
                                                    ...this.state.newRegister,
                                                    glr_insulinDosesUsed: value
                                                }
                                            })
                                        }}
                                    />
                                </View>
                            </View>
                        }
                    </View>
                    <Button
                        style={style.createButton}
                        icon={'plus'}
                        onPress={this.create}
                        mode='outlined'
                        color={'#00c40d'}
                        disabled={this.state.isCreating}
                        loading={this.state.isCreating}>
                        Adicionar
                    </Button>
                </View>
                <ConsumptionModal ref={ref => { this._consumptionModal = ref }} />
            </>
        );
    }
}