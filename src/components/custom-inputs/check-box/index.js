import React from "react";
import { View, Text } from 'react-native'
import { Checkbox } from 'react-native-paper'
import style from "./style";

export default function CustomCheckBox(props) {
    const [checked, setChecked] = React.useState(props.value);
    return (
        <View style={style.row}>
            <Text style={style.label}>{props.label}</Text>
            <View style={style.checkBox}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked(!checked);
                        props.onChange(!checked);
                    }}
                />
            </View>
        </View>
    )
}