import React from 'react';
import { Text } from 'react-native';
import Constants from 'expo-constants';

export default function Home(){
    return <>
        <Text style={{marginTop: Constants.statusBarHeight}}>Home</Text>
    </>
}