import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import CustomTextInput from '../../components/custom-inputs/text-input';
import Account from "../../model/account";
import style from './style'
import LogoHome from '../../assets/logo-home.svg'
export default function SignIn({ navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signIn = async () => {
		navigation.navigate('Main')
	}
	const rememberPassword = async () => {

	}

	return (
		<View style={style.container}>
			<View style={style.logo}>
				<LogoHome width={400} height={48} />
			</View>
			<View style={style.form}>

				<CustomTextInput
					value={email}
					label={'Email'}
					placeholder={'example@example.com'}
					type={'email'}
					onChange={(value) => {
						setEmail(value)
					}}
					style={style.textInput}
				/>
				<CustomTextInput
					value={password}
					label={'Senha'}
					placeholder={'*********'}
					type={'password'}
					onChange={(value) => {
						setPassword(value)
					}}
					style={style.textInput}
				/>
			</View>
			<View style={style.buttons}>
				<Pressable style={{ ...style.button, ...style.defaultButton }}
					onPress={signIn}>
					<Text style={{ color: 'white', fontWeight: 'bold', ...style.fontSizeButton }}>Entrar</Text>
				</Pressable>
				<View style={style.row}>
					<Text style={{ color: '#000' }}>Esqueceu sua senha?</Text><Pressable onPress={rememberPassword}><Text style={{ color: '#F96B70' }}> Clique aqui!</Text></Pressable>
				</View>
			</View>
		</View>
	)
}