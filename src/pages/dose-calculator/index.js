import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomTextInput from '../../components/custom-inputs/text-input';
import style from './style.js';
import LocalConfig from '../../storage/localConfig';
import GlucoseRecordService from '../../services/glucose-record-service';
import Loader from '../../components/loader';
import { ScrollView } from 'react-native-gesture-handler';

import Glucometer from '../../assets/glucometer.svg';
import BlueDownArrow from '../../assets/blue-down-arrow.svg';
import SearchModalCombo from '../../components/search-modal-combo';

export default function index() {
    const [consumptions, setConsumptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [bestDosages, setBestDosages] = useState([]);
    const [selectedConsumption, setSelectedConsumption] = useState('');

    const timeConvert = (n) => {
        const num = n;
        const hours = (num / 60);
        const rhours = Math.floor(hours);
        const minutes = (hours - rhours) * 60;
        const rminutes = Math.round(minutes);
        return rhours + " h e " + rminutes + " min";
    }

    //#region glycemic_goal
    const [glycemicGoal, setglycemicGoal] = useState('');

    const loadglycemicGoal = async () => {
        const glycemic_goal = await LocalConfig.get('glycemic_goal');
        setglycemicGoal(glycemic_goal);
    }

    const setAndRegisterglycemicGoal = async (value) => {
        setglycemicGoal(value);
        await LocalConfig.set('glycemic_goal', value);
    };
    //#endregion

    const getArrowDirection = (prev, next) => {
        if (prev === next) {
            return <Text>👌</Text>
        } else if (prev < next) {
            return <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'green' }}>+</Text>
        } else {
            return <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>-</Text>
        }
    }
    useEffect(() => {
        loadglycemicGoal();
    }, []);

    const search = async (q) => {
        if (q.length <= 3) return;
        const service = new GlucoseRecordService();
        const data = await service.listConsumption(q);
        setConsumptions(data);
    };

    const getBestDosages = async (item) => {
        setLoading(true);
        setSelectedConsumption(item);
        const service = new GlucoseRecordService();
        const data = await service.getBestDosages(item, glycemicGoal);
        setBestDosages(data);
        setConsumptions([]);
        setLoading(false);
    }

    return (
        <View style={style.container}>
            <View style={style.form}>
                <SearchModalCombo
                    label={'Selecione a refeição'}
                    onChangeSearchText={search}
                    onSelect={getBestDosages}
                    data={consumptions}
                />

                <CustomTextInput
                    value={glycemicGoal}
                    label={'Meta Glicêmica'}
                    placeholder={'100'}
                    metric={'mg/Dl'}
                    type={'number'}
                    onChange={setAndRegisterglycemicGoal}
                    style={{ marginTop: 40 }}
                />


                <ScrollView style={{ minHeight: 0, height: 'auto', marginTop: 30, backgroundColor: '#F96B70' }}>
                    <Loader isLoading={loading}>
                        {bestDosages.map((item, idx) => {
                            return (
                                <View key={item.id} style={style.dosageCard}>
                                    {
                                        idx === 0 &&
                                        <Text style={style.bestDose}>🏆 Melhor dose</Text>
                                    }
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <View style={style.dosageRow}>
                                            <View style={{ padding: 5 }}><Glucometer width={36} height={36} /></View>
                                            <Text style={style.dosageLabel}>{item.prev_mg_per_dl} às {item.prev_created_at}</Text>
                                        </View>
                                        <View style={style.dosageRow}>
                                            <View>{getArrowDirection(item.prev_mg_per_dl, item.mg_per_dl)}</View>
                                            <View><BlueDownArrow width={36} height={36} /></View>
                                            <View><Text>{'⏳' + timeConvert(item.minutes_diff)}</Text></View>
                                        </View>
                                        <View style={style.dosageRow}>
                                            <View style={{ padding: 5 }}>
                                                <Glucometer width={36} height={36} />
                                            </View>
                                            <Text style={style.dosageLabel}>{item.mg_per_dl} às {item.created_at}</Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                    </Loader>
                </ScrollView>
            </View>
        </View>
    )
}