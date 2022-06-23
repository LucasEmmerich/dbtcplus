import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import style from './style';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

import CustomTextInput from '../../components/custom-inputs/text-input';
import Button from '../../components/button';
import Header from '../../components/header';

import UserService from '../../services/user-service';
import config from '../../storage/localConfig';

import LogoHome from '../../assets/logo-home.svg'

export default function SignIn({ navigation }) {
	const service = new UserService();
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	const signIn = async () => {
		try {
			const data = await service.authenticate(login, password);
			if (data?.authorized) {
				await config.set('user-status', 'authorized');
				await config.set('user-token', data?.token);
				await config.set('user-name', login);
				Toast.show({
					type: 'success',
					text1: 'Sucesso!',
					text2: 'Autenticado.'
				});

				navigation.popToTop();
				navigation.navigate('Main');
			} else {
				throw new Error();
			}
		}
		catch (e) {
			Toast.show({
				type: 'error',
				text1: 'Atenção!',
				text2: 'Nome de usuário ou senha incorretos.'
			});
		}
	}

	const rememberPassword = async () => {

	}

	return (
		<>
			<Header update />
			<ScrollView style={{ backgroundColor: 'white' }}>
				<View style={style.container}>
					<View style={style.logo}>
						<LogoHome width={400} height={48} />
					</View>
					<View style={style.form}>
						<CustomTextInput
							value={login}
							label={'Usuário ou Email'}
							placeholder={'joaopedro40 / joaopedro40@email.com'}
							onChange={setLogin}
						/>
						<CustomTextInput
							value={password}
							label={'Senha'}
							placeholder={'*********'}
							type={'password'}
							onChange={setPassword}
						/>
					</View>
					<View style={style.buttons}>
						<Button onPress={signIn} title={'Entrar'} />
						<View style={style.row}>
							<Text style={{ color: '#000' }}>Esqueceu sua senha?</Text><Pressable onPress={rememberPassword}><Text style={{ color: '#F96B70' }}> Clique aqui!</Text></Pressable>
						</View>
					</View>
				</View>
			</ScrollView>
		</>
	)
}