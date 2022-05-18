import React from "react";
import { Text, TextInput, View } from 'react-native'
import style from "./style";

const INPUT_TYPES = {
    'number': 'numeric',
    'email': 'email-address',
    'password': 'default'

}

export default function CustomTextInput(props) {
    return (
        <View style={{
            ...style.textInput,
            ...(props.width ? { width: props.width } : { width: '85%' })
        }}>
            <Text style={style.label}>
                {props.label}
            </Text>
            <View style={{ ...style.row, ...style.defaultTextInput }}>
                <TextInput
                    value={props.value}
                    editable={props.enabled}
                    style={
                        style.input
                    }
                    onChangeText={props.onChange}
                    placeholder={props.placeholder}
                    keyboardType={INPUT_TYPES[props.type] ?? 'default'}
                    secureTextEntry={true}
                    autoCorrect={false}
                />
                {props.metric && <View style={style.metric}>
                    <Text style={style.textMetric}>
                        {props.metric}
                    </Text>
                </View>
                }
            </View>
        </View >
    )
}