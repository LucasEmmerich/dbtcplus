import React from "react";
import { View, Text, Alert, Pressable } from 'react-native';
import style from "./style";
import { navigate, goBack } from "../../Navigation";

import ConfigIcon from '../../assets/configuration-wheel-svgrepo-com.svg';
import BackIcon from '../../assets/back-svgrepo-com.svg';
import LogoutIcon from '../../assets/logout-svgrepo-com.svg';
import LocalConfig from "../../storage/localConfig";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {}
        }
    }

    async componentDidMount() {
        const status = await LocalConfig.get('user-status');
        const name = await LocalConfig.get('user-name');
        this.setState({
            userData: {
                status,
                name
            }
        })
    }

    logout = async () => {
        await LocalConfig.reset('user-name');
        await LocalConfig.reset('user-token');
        await LocalConfig.reset('user-status');
        this.setState({ userData: {} });
        navigate('SignIn', {});
    };

    confirmLogout = () => {
        Alert.alert(
            "Atenção",
            "Tem certeza que deseja sair do sistema?",
            [
                {
                    text: "Sim",
                    onPress: this.logout
                },
                {
                    text: "Não, quero ficar.",
                },
            ]
        );
    }

    render() {
        return (
            <View style={style.container}>
                <Pressable style={style.leftContainer}>
                    {this.props.hideBackButon && <BackIcon width={30} height={30} onPress={goBack} />}
                </Pressable>
                {
                    this.state.userData.status === 'authorized' &&
                    <View style={style.rightContainer}>
                        <Text style={style.nameLabel}>{this.state.userData.name}</Text>
                        <Pressable>
                            <ConfigIcon width={30} height={30} onPress={() => navigate('Configuration')} />
                        </Pressable>
                        <Pressable style={{ marginLeft: 10 }}>
                            <LogoutIcon width={30} height={30} onPress={this.confirmLogout} />
                        </Pressable>
                    </View>
                }
            </View>
        )
    }
}