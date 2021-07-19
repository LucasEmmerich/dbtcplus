import React from "react";
import { View, Text } from 'react-native'
import { Checkbox } from 'react-native-paper'
import style from "./style";

export default function CustomCheckBox(props) {
    return (
        <View style={style.row}>
            <Text style={style.label}>{props.label}</Text>
            <View style={style.checkBox}>
                <Checkbox
                    status={props.value === true ? 'checked' : 'unchecked'}
                    onPress={() => {
                        props.onChange(!props.value);
                    }}
                />
            </View>
        </View>
    )
}