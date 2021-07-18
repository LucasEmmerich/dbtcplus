import React from "react";
import { View, Text, Image } from 'react-native';
import style from "./style";
import logo from '../../assets/logo.png';

export default function Header(props) {
    return (
        <View style={style.container}>
            <Image source={logo} style={style.logo} />
            <Text style={style.nameLabel}>Bom dia, Lucas Araujo Emmerich...</Text>
        </View>
    )
}