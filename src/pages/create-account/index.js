import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import CustomTextInput from '../../components/custom-inputs/text-input';
import style from './style'
import LogoHome from '../../assets/logo-home.svg'
import Header from '../../components/header';

export default function CreateAccount() {
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const createAccount = async () => {

	}

	return (
		<>
			<Header />
			<View style={style.container}>
				<View style={style.logo}>
					<LogoHome height={48} />
					<View><Text>Não disponível</Text></View>
				</View>
				{/* <View style={style.form}>
					<CustomTextInput
						value={email}
						label={'Insira seu nome de usuário'}
						placeholder={'João Paulo Soares'}
						onChange={setUsername}
						style={style.textInput}
					/>
					<CustomTextInput
						value={email}
						label={'Insira seu nome de usuário'}
						placeholder={'beltrano35'}
						onChange={setUsername}
						style={style.textInput}
					/>
					<CustomTextInput
						value={email}
						label={'Insira seu e-mail'}
						placeholder={'example@example.com'}
						type={'email'}
						onChange={setEmail}
						style={style.textInput}
					/>
					<CustomTextInput
						value={password}
						label={'Crie uma senha'}
						placeholder={'*********'}
						type={'password'}
						onChange={setPassword}
						style={style.textInput}
					/>
				</View>
				<View style={style.buttons}>
					<Pressable style={{ ...style.button, ...style.defaultButton }}
						onPress={createAccount}>
						<Text style={{ color: 'white', fontWeight: 'bold', ...style.fontSizeButton }}>Criar conta</Text>
					</Pressable>
				</View> */}
			</View>
		</>
	)
}