import React from 'react';
import Toast from 'react-native-toast-message';
import style from './style';

const CONFIG = { position: 'top', autoHide: true };

function ToastRef() {
    return <Toast ref={(ref) => Toast.setRef(ref)} style={style.toast} />
}

class Toastify {
    static success(msg, time = 1) {
        Toast.show({
            ...CONFIG,
            type: 'success',
            text1: 'Sucesso!',
            text2: msg,
            visibilityTime: time
        })
    }
    static error(msg, time = 1) {
        Toast.show({
            ...CONFIG,
            type: 'error',
            text1: 'Erro!',
            text2: msg,
            visibilityTime: time
        })
    }
    static info(msg, time = 1) {
        Toast.show({
            ...CONFIG,
            type: 'info',
            text1: 'Atenção!',
            text2: msg,
            visibilityTime: time
        })
    }
}

export { ToastRef, Toastify };