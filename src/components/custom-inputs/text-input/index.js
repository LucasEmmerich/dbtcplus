import React from "react";
import { Text, TextInput, View } from 'react-native'
import style from "./style";

const INPUT_TYPES = {
    'number': 'numeric',
    'email': 'email-address',
    'password': 'password'
}

export default function CustomTextInput(props) {
    const Icon = props.icon
    return (
        <View style={{ ...style.row, borderBottomColor: '#DFF0EB', borderBottomWidth: 3 }}>
            <Text style={style.label}>
                {props.label}
            </Text>
            <View style={style.row}>
                <Icon />

                <TextInput
                    value={props.value}
                    editable={props.enabled}
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
        </View >
    )
}