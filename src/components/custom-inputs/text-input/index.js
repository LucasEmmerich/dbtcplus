import React from "react";
import { Text, TextInput, View } from 'react-native';
import style from "./style";

const INPUT_TYPES = {
    'default': 'text',
    'number': 'numeric',
    'email': 'email-address'
}

export default function CustomTextInput(props) {
    const onChange = (value) => {
        switch(props.type){
            case 'number':
                value = value.replace(/[^0-9]/g, '')
                break;
        }
        props.onChange(value);
    };

    return (
        <View style={{
            ...style.textInput,
            ...(props.width ? { width: props.width } : { width: '85%' })
        }}>
            <Text style={{ ...style.label, opacity: (props.enabled === false ? 0.5 : 1) }}>
                {props.label}
            </Text>
            <View style={{ ...style.row, ...style.defaultTextInput }}>
                <TextInput
                    {...props}
                    autoCapitalize='none'
                    value={props.value}
                    editable={props.enabled}
                    style={style.input}
                    onChangeText={onChange}
                    placeholder={props.placeholder}
                    keyboardType={INPUT_TYPES[props.type] ?? 'default'}
                    secureTextEntry={props.type === 'password'}
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