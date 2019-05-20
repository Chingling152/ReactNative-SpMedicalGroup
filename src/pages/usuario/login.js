import React, { Component } from 'react';
import {
	StyleSheet,
	Text, View, StatusBar,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'
import { ApiRequest } from '../../services/apiServices';
import { DefaultStyleSheet } from '../../assets/styles/padrao';

class Login extends Component {

	static navigationOptions = {
		header: null
	};

	constructor(props) {
		super(props);
		this.state = {
			email: "",
			senha: "",
			erro: "",
			carregando: false
		};
	}
	_validarDados = () => {
		const email = this.state.email
		if (email == null || email.trim().length === 0) {
			this.setState({ erro: "O email é obrigatorio" })
			return false
		}
		const senha = this.state.senha
		if (senha == null || senha.trim().length === 0) {
			this.setState({ erro: "A senha é obrigatoria" })
			return false
		}
		return true;
	}

	_realizarLogin = async () => {
		if (this._validarDados()) {
			this.setState({ carregando: true })
			await ApiRequest("Usuario/Login")
				.Cadastrar({
					email: this.state.email.trim(),
					senha: this.state.senha
				})
				.then(
					resultado => {
						switch (resultado.status) {
							case 200:
								resultado.json().then(
									resposta => {
										AsyncStorage.multiSet(
											[
												["TokenSpMedGroup", resposta.token],
												["EmailUsuarioSpMedGroup", this.state.email],
												["SenhaUsuarioSpMedGroup", this.state.senha]
											]
										)
										this.props.navigation.navigate("Consultas")
									}
								);
								break;
							case 404:
								resultado.json().then(
									resposta => {
										this.setState({ erro: resposta })
									}
								);
								break;
							default:
								break;
						}
					}
				)
				.catch(erro => {
					//console.warn(erro)
					this.setState({ erro: "Ocorreu um erro inesperado\nPor favor contate o administrador" })
				})
			this.setState({ carregando: false })
		}
	}

	render() {
		const carregador = 
		this.state.carregando?
		<ActivityIndicator size="large" color="#FFFFFF" animating={true}/>:
		null;
		return (
			<View style={styles.mainContent}>
				<StatusBar backgroundColor={'#5ba06d'} bar-barStyle={'light-content'}/>
				<Text style={styles.loginTitle}>Login</Text>
				<View style={styles.loginForm}>
					<View style={styles.loginInputView}>
						<Text style={styles.loginLabelInput}>Digite seu email:</Text>
						<TextInput
							style={styles.loginInput}
							placeholder="seuemail@email.com"
							onChangeText={email => this.setState({ email })}
							textContentType='emailAddress'
							/>
					</View>
					<View style={styles.loginInputView}>
						<Text style={styles.loginLabelInput}>Digite sua senha:</Text>
						<TextInput
							style={styles.loginInput}
							placeholder="suasenha"
							onChangeText={senha => this.setState({ senha })}
							textContentType='password'
							password="true"
							secureTextEntry={true} 
						/>
					</View>
					<TouchableOpacity
						onPress={this._realizarLogin}
						style={styles.loginSubmit}
						activeOpacity={0.5}
						disabled={this.state.carregando}
					>
					<Text style={styles.loginSubmitText}>Login</Text>
					</TouchableOpacity>
					{carregador}
					<Text style={DefaultStyleSheet.errorMessage}>{this.state.erro}</Text>
				</View>
				{/* <Image
					source={require("../../assets/images/icon-login.png")}
					style={styles.loginIcon}
				/> */}
			</View>
		);
	}
}
export default Login;

const styles = StyleSheet.create(
	{
		mainContent: {
			justifyContent: 'center',
			width: "100%",
			height: "100%",
			alignContent: "center",
			alignItems: "center",
			backgroundColor: '#81df99',
		},
		loginForm: {
			width: '100%',
			alignItems: 'center',
		},
		loginIcon: {
			resizeMode: 'contain',
			width: '100%',
			height: '100%',
			marginVertical: 15,
			top: 100
		},
		loginTitle: {
			letterSpacing: 5,
			fontSize: 28,
			fontWeight: '600',
			marginVertical: 15
		},
		loginInputView:{
			width:'70%',
			marginVertical: 5
		},
		loginLabelInput:{
			fontSize: 16,
			fontWeight: '600',
		},
		loginInput: {
			borderRadius: 14,
			borderWidth: 1,
			borderColor: 'white',
			backgroundColor: 'white',
			paddingVertical: 5,
			paddingHorizontal: 5,
			marginVertical: 15,
			...DefaultStyleSheet.shadowContent,
		},
		loginSubmit: {
			width: '45%',
			marginVertical: 10,
			borderWidth: 1,
			borderColor: '#8beda4',
			backgroundColor: '#8beda4',
			padding: 10,
			borderRadius: 14,
			alignContent: 'center',
			alignItems: 'center',
			...DefaultStyleSheet.shadowContent
		},
		loginSubmitText: {
			color: 'white',
			letterSpacing: 3,
			fontSize: 20,
		}
	}
);