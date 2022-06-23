
import * as React from 'react';
import { StackActions } from '@react-navigation/native';

export const navigationRef = React.createRef();

export const navigate = (name, params) => navigationRef.current?.navigate(name, params);
export const canGoBack = () => navigationRef.current?.canGoBack();
export const goBack = () => {
    if(navigationRef.current?.canGoBack()){
        navigationRef.current?.goBack()
    }
}
export const resetStack = () => {
    navigationRef.current?.dispatch(StackActions.popToTop());
}