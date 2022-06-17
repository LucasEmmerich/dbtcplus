import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomTextInput from '../../components/custom-inputs/text-input';
import style from './style.js';
import LocalConfig from '../../storage/localConfig';

export default function index() {
    const [searchText, setSearchText] = useState('');
    const [selectedConsumption, setSelectedConsumption] = useState('');

    //#region glicemic_goal
    const [glicemicGoal, setGlicemicGoal] = useState('');

    const loadglicemicGoal = async () => {
        const glicemic_goal = await LocalConfig.get('glicemic_goal');
        setGlicemicGoal(glicemic_goal);
    }

    const setAndRegisterGlicemicGoal = async (value) => {
        setGlicemicGoal(value);
        await LocalConfig.set('glicemic_goal', value);
    };
    //#endregion

    useEffect(() => {
        loadglicemicGoal();
    }, []);

    const search = () => {
        alert('dale')
    }

    return (
        <View style={style.container}>
            <View style={style.form}>
                <CustomTextInput
                    value={searchText}
                    label={'O que você irá comer?'}
                    placeholder={'macarrão da vovó'}
                    type={'text'}
                    onChange={setSearchText}
                />
                <CustomTextInput
                    value={glicemicGoal}
                    label={'Meta Glicêmica'}
                    placeholder={'100'}
                    metric={'mg/Dl'}
                    type={'number'}
                    onChange={setAndRegisterGlicemicGoal}
                />
            </View>
        </View>
    )
}