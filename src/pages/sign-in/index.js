import React, { useState } from "react";
import { View, Pressable, Text } from "react-native";
import style from "./style";
import LogoHome from '../../assets/logo-home.svg'
import Header from "../../components/header";
import CustomTextInput from "../../components/custom-inputs/text-input";
import UserService from "../../services/user-service";
import Button from "../../components/button";
import Toast from 'react-native-toast-message';
import LocalConfig from "../../storage/localConfig";

export default function Login({ navigation }) {
	const service = new UserService();
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	const signIn = async () => {
		try {
			const data = await service.authenticate(login, password);
			if (data?.authorized) {
				await LocalConfig.set('user-status', 'authorized');
				await LocalConfig.set('user-token', data?.token);
				await LocalConfig.set('user-name', login);
				Toast.show({
					type: 'success',
					text1: 'Sucesso!',
					text2: 'Autenticado.'
				});

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

	return (
		<>
			<Header hideBackButton />
			<View style={style.container}>
				<View style={style.welcome}>
					<Text style={{ ...style.title }}>SEJA BEM VINDO AO</Text>
					<LogoHome width={300} />
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
				<View style={{ ...style.row, marginBottom: 50 }}>
					<Text style={{ color: '#000' }}>Esqueceu sua senha? </Text>
					<Pressable onPress={() => true}>
						<Text style={{ color: '#F96B70' }}>
							Clique aqui!
						</Text>
					</Pressable>
				</View>
				<Button style={{ alignSelf: 'center', margin: 5 }} onPress={signIn} title={'Entrar'} />
				<Button style={{ alignSelf: 'center', margin: 5, backgroundColor: '#6da2f7' }} onPress={() => navigation.navigate('CreateAccount')} title={'Registrar-se'} />
			</View >
		</>
	);
}
