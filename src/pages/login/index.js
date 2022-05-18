import React from "react";
import { View, Pressable, Text } from "react-native";
import style from "./style";
import LogoHome from '../../assets/logo-home.svg'

export default function Login({ navigation }) {
	const navigateToCreateAccount = () => {
		navigation.navigate('CreateAccount')
	};
	const navigateToSignIn = () => {
		navigation.navigate('SignIn')
	};
	const loginWithGoogle = () => {

	};

	return (
		<View style={{ ...style.container }}>

			<View style={{ ...style.welcome }}>
				<Text style={{ ...style.font, ...style.subtitle }}>SEJA BEM VINDO AO</Text>
				<LogoHome width={300} />

			</View>

			<View style={style.buttonContainer}>
				<View style={style.buttons}>
					<Pressable style={{ ...style.button, ...style.defaultButton }}
						onPress={navigateToCreateAccount}>
						<Text style={{ color: 'white', fontWeight: 'bold', ...style.fontSizeButton }}>Crie uma conta</Text>
					</Pressable>

					<Pressable style={{ ...style.button, ...style.customButtonLogin }}
						onPress={loginWithGoogle}>
						<Text>Entrar com o google</Text>
					</Pressable>

					<View style={style.row}>
						<Text style={{ color: '#000' }}>Já tem uma conta?</Text><Pressable onPress={navigateToSignIn}><Text style={{ color: '#F96B70' }}> faça login!</Text></Pressable>
					</View>

				</View>
			</View>

		</View >
	);
}
