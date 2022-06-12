import React from 'react';
import { View, Text } from 'react-native';
import { Modal } from 'react-native-paper';
import GlucoseRecord from '../../model/glucose_record';
import style from './style';

export default class ConsumptionModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
            data: {}
        }
    }

    open = (data) => { this.setState({ data: data, opened: true }); }

    close = () => { this.setState({ opened: false }) };

    render() {
        return (
            <Modal visible={this.state.opened} onDismiss={this.close}  style={style.container}>
                <View style={style.container}>
                    <Text>Glicose: {this.state.data.glr_mg_per_dl} gl/Dl</Text>
                    <Text>Consumo: {this.state.data.glr_consumption}</Text>
                    <Text>Aplicou: {this.state.data.glr_insulinDosesUsed} doses</Text>
                </View>
            </Modal>
        );
    }
};