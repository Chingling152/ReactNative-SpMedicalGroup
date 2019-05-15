import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { TokenValido, UsuarioLogado } from '../../services/auth';
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

	componentDidMount() {
		this.setState({ carregando: true })
		TokenValido().then(
			valido => {
				if (valido) {
					this.props.navigation.navigate("Consultas")
				} else {
					this._buscarDados();
				}
			})

	}

	_buscarDados = async () => {
		UsuarioLogado().then(
			usuario=>{
				const email = usuario.email
				const senha = usuario.senha
				if(email !== null && senha !== null){
					this.setState({
						email,
						senha
					});
					this._realizarLogin()
				}
			}
		)
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
												["TokenSpMedGroup",resposta.token],
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
					.catch(erro => console.warn(erro))
				}
				this.setState({ carregando: false })
	}

	render() {
		return (
			<ImageBackground
				source={require('../../assets/images/login-background.jpg')}
				style={styles.mainContent}
			>
				<View style={styles.overlay} />
				<View style={styles.loginForm}>
					<Image 
						source={require("../../assets/images/icon-login.png")}
						style={styles.loginIcon}
					/>
					<Text>Login</Text>
					<View>
						<TextInput
							placeholder="seuemail@email.com"
							onChangeText={email => this.setState({ email })}
							textContentType='emailAddress'
						/>
						<TextInput
							placeholder="suasenha"
							onChangeText={senha => this.setState({ senha })}
							textContentType='password'
							password="true"
						/>
						<TouchableOpacity
							onPress={this._realizarLogin}
						>
							<Text>Login</Text>
						</TouchableOpacity>
					</View>
					<Text style={DefaultStyleSheet.mensagemErro}>{this.state.erro}</Text>
				</View>
			</ImageBackground>
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
			alignItems: "center"
		},
		overlay: {
			...StyleSheet.absoluteFill,
			backgroundColor: '#81df99'//"rgba(0,0,0,0.5)"
		},
		loginForm: {
			backgroundColor: 'white',
			padding: 20,
			width:"60%"
		},
		loginIcon:{
			resizeMode:'contain',
			width:"60%",
			height:"40%",
			alignSelf:'center',
			marginVertical:15
		}
	}
);