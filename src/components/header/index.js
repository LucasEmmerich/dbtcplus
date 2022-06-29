import React, { useEffect, useReducer, useState } from "react";
import { View, Text, Alert } from 'react-native';
import style from "./style";
import { navigate, goBack, resetStack } from "../../Navigation";

import ConfigIcon from '../../assets/configuration-wheel-svgrepo-com.svg';
import BackIcon from '../../assets/back-svgrepo-com.svg';
import LogoutIcon from '../../assets/logout-svgrepo-com.svg';
import LocalConfig from "../../storage/localConfig";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

export default function Header(props) {
    const [userData, setUserData] = useState({});

    const getUserData = async () => {
        const status = await LocalConfig.get('user-status');
        const name = await LocalConfig.get('user-name');
        setUserData({ status, name });
    };

    const logout = async () => {
        await LocalConfig.reset('user-name');
        await LocalConfig.reset('user-token');
        await LocalConfig.reset('user-status');
        setUserData({});
        navigate('SignIn', {});
    };

    const confirmLogout = () => {
        Alert.alert(
            "Atenção",
            "Tem certeza que deseja sair do sistema?",
            [
                {
                    text: "Sim",
                    onPress: logout
                },
                {
                    text: "Não, quero ficar.",
                },
            ]);
    }

    useEffect(() => {
        getUserData();
    }, [])

    return (
        <View style={style.container} key={Date.now()}>
            <Pressable style={style.leftContainer}>
                {!props.hideBackButton && <BackIcon width={30} height={30} onPress={goBack} />}
            </Pressable>
            {
                userData.status === 'authorized' &&
                <View style={style.rightContainer}>
                    <Text style={style.nameLabel}>{userData.name}</Text>
                    <Pressable>
                        <ConfigIcon width={30} height={30} onPress={() => navigate('Configuration')} />
                    </Pressable>
                    <Pressable style={{ marginLeft: 10 }}>
                        <LogoutIcon width={30} height={30} onPress={confirmLogout} />
                    </Pressable>
                </View>
            }
        </View>
    )
}