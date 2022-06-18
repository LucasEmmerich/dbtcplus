import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomTextInput from '../../components/custom-inputs/text-input';
import style from './style.js';
import LocalConfig from '../../storage/localConfig';
import SearchableDropDown from 'react-native-searchable-dropdown';
import GlucoseRecordService from '../../services/glucose-record-service';

import Glucometer from '../../assets/glucometer.svg';
import BlueDownArrow from '../../assets/blue-down-arrow.svg';
import BlueUpArrow from '../../assets/blue-up-arrow.svg';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

export default function index() {
    const [consumptions, setConsumptions] = useState([]);
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

    const search = async (q = '') => {
        if (q.length <= 3) return;
        const service = new GlucoseRecordService();
        const data = await service.listConsumption(q);
        const mappedData = data?.map(item => {
            return {
                id: item,
                name: item
            };
        });
        setConsumptions(mappedData);
    };

    const getBestDosages = async (item) => {
        setSelectedConsumption(item);
        const service = new GlucoseRecordService();
        const data = await service.getBestDosages(item.name, glycemicGoal);
        setBestDosages(data);
    }

    return (
        <View style={style.container}>
            <View style={style.form}>
                <Text style={{ width: '85%', alignSelf: 'center', fontWeight: '600', paddingBottom: 5, color: '#000' }}>
                    O que você vai comer?
                </Text>
                <View style={{ height: 50, zIndex: 999 }}>
                    <SearchableDropDown
                        onTextChange={search}
                        onItemSelect={getBestDosages}
                        containerStyle={style.searchableDropDown.containerStyle}
                        textInputStyle={style.searchableDropDown.textInputStyle}
                        itemStyle={style.searchableDropDown.itemStyle}
                        items={consumptions}
                        selectedItems={selectedConsumption}
                        placeholder={"macarrão da vovó"}
                        resetValue={false}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <CustomTextInput
                    value={glycemicGoal}
                    label={'Meta Glicêmica'}
                    placeholder={'100'}
                    metric={'mg/Dl'}
                    type={'number'}
                    onChange={setAndRegisterglycemicGoal}
                />

                <ScrollView>
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
                </ScrollView>

            </View>
        </View>
    )
}