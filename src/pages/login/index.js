import React from "react";
import { View, Image, Pressable, Text } from "react-native";
import style from "./style";
import CustomTextInput from "../../components/custom-inputs/text-input";
import Account from "../../model/account";
import { useState } from "react";
import LogoHome from '../../assets/logo-home.svg'

export default function Login() {
	const [account, setAccount] = useState(new Account());
	const onPressFunction = () => {

	}
	return (
		<View style={{ ...style.container }}>

			<View style={{ ...style.welcome }}>
				<Text style={{ ...style.font, ...style.subtitle }}>SEJA BEM VINDO AO</Text>
				<LogoHome width={300} />

			</View>

			<View style={style.buttons}>


				<Pressable style={{ ...style.button, ...style.defaultButton }}
					onPress={onPressFunction}>
					<Text style={{ color: 'white', fontWeight: 'bold', ...style.fontSizeButton }}>Crie uma conta</Text>
				</Pressable>

				<Pressable style={{ ...style.button, ...style.customButtonLogin }}
					onPress={onPressFunction}>
					<Text>Entrar com o google</Text>
				</Pressable>

				<View style={style.row}>
					<Text style={{ color: '#000' }}>Já tem uma conta?</Text><Pressable><Text style={{ color: '#F96B70' }}> faça login!</Text></Pressable>
				</View>

			</View>

		</View >
	);
}
