import React from "react";
import { View, Text } from 'react-native'
import { Checkbox } from 'react-native-paper'
import style from "./style";

export default class CustomCheckBox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={style.row} >
                <Text style={style.label}>{this.props.label}</Text>
                <View style={style.checkBox}>
                    <Checkbox
                        status={this.props.value === true ? 'checked' : 'unchecked'}
                        onPress={() => {  this.props.onChange(!this.props.value); }}
                    />
                </View>
            </View>
        )
    }
}