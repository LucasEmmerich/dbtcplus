import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import CustomTextInput from '../../components/custom-inputs/text-input';
import style from './style'
import LogoHome from '../../assets/logo-home.svg'
import Header from '../../components/header';

export default function CreateAccount() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const createAccount = async () => {

	}

	return (
		<>
			<Header />
			<View style={style.container}>
				<View style={style.logo}>
					<LogoHome width={400} height={48} />
				</View>
				<View style={style.form}>

					<CustomTextInput
						value={email}
						label={'Insira seu e-mail'}
						placeholder={'example@example.com'}
						type={'email'}
						onChange={(value) => {
							setEmail(value)
						}}
						style={style.textInput}
					/>
					<CustomTextInput
						value={password}
						label={'Crie uma senha'}
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
						onPress={createAccount}>
						<Text style={{ color: 'white', fontWeight: 'bold', ...style.fontSizeButton }}>Criar conta</Text>
					</Pressable>
				</View>
			</View>
		</>
	)
}