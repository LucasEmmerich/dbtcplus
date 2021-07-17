import React from "react";
import { Text, TextInput, View } from 'react-native'
import style from "./style";

const INPUT_TYPES = {
    'number': 'numeric',
    'email': 'email-address'
}

export default function CustomInput(props) {
    return (
        <View style={style.row}>
            <Text style={style.label}>
                {props.label}
            </Text>
            <View style={style.row}>
                <TextInput
                    style={{
                        ...style.input,
                        ...props.style,
                        ...(props.metric ? {} : { borderBottomRightRadius: 5, borderTopRightRadius: 5 })
                    }}
                    onChangeText={props.onChange}
                    placeholder={props.placeholder}
                    keyboardType={INPUT_TYPES[props.type] ?? 'default'}
                />
                <Text style={{
                    ...style.metric,
                    display: props.metric ? 'flex' : 'none',
                    borderWidth: props.metric ? 1 : 0
                }}>
                    {props.metric}
                </Text>
            </View>
        </View>
    )
}