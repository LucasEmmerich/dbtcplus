import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import style from './style';

export default function Loader(props) {
    return (
        <View style={props.style}>
            {
                props.isLoading &&
                <View style={style.loader}>
                    <ActivityIndicator
                        size={'large'}
                        color="#000000"
                        animating={true}
                    />
                </View>
            }
            {props.children}
        </View>
    )
}