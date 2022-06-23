import React from 'react';
import { Pressable, Text } from 'react-native';
import style from './style';

export default function Button(props) {
    return (
        <Pressable style={{ ...style.button, ...props.style }} onPress={props.onPress}>
            <Text style={style.text}>{props.title}</Text>
        </Pressable>
    );
}
