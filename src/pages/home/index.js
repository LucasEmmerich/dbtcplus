import React from 'react';
import { View, Text, Alert, Button, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import GlucoseRecord from '../../model/glucose_record'
import GlucoseRecordService from '../../services/GlucoseRecordService';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    }
});

export default function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const buttons = [<Button onPress={test} title="teste" />, <Button onPress={test} title="teste" />]
        // test()
    }, [])

    const test = async () => {
        const obj = new GlucoseRecord();
        obj.glr_mgperdl = 100;
        const serv = new GlucoseRecordService();
        await serv.create(obj)
        let teste = await serv.list();
        Alert.alert('tamanhototal ' + JSON.stringify(teste.length));
        teste = await serv.get(25);
        Alert.alert(teste.glr_id + '');
        await serv.delete(25);
        Alert.alert(teste + '');
    }

    return (
        <View style={{ ...styles.container, marginTop: Constants.statusBarHeight }}>
            <View style={styles.buttonContainer}>
                <Button title="Button 1" />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Button 2" />
            </View>
        </View>
    );
}