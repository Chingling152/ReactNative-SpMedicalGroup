import React, { Component } from 'react';

import { 
	StyleSheet, 
	Text, 
	View, 
	ActivityIndicator, 
	TouchableOpacity, 
	Alert,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'

import { TokenValido, UsuarioLogado } from '../../services/auth';
import { ApiRequest } from '../../services/apiServices';

import Consulta from '../../componentes/Consultas/consulta';

import jwt from 'jwt-decode'

class ListarConsultas extends Component {
	constructor(props) {
		super(props);
		this.state = {
			consultas: [],
			carregando: true,
			usuarioLogado: []
		}
		this.verConsultaRef = React.createRef();
		this._listarConsultas = this._listarConsultas.bind(this);
	}

	static navigationOptions = ({navigation})=>{
		let {params = {}} = navigation.state; 	
		const headerRight = (
			<TouchableOpacity style={{ marginRight: 20 }} onPress={params.logout}>
				<Text style={{ fontWeight: '600', color: 'white', fontSize: 16 }}>Logout</Text>
			</TouchableOpacity>
			)

			return {headerRight}
	};

	componentDidMount() {
		this._verificarDados();
		this.props.navigation.setParams({logout:this._logoutUsuario});
	}

	_logoutUsuario=() =>{

		Alert.alert(
			'Requer confirmação', 'Você tem certeza que quer sair do seu usuario?'
			, [
				{
					text: 'Sim', onPress: async() =>{
						await AsyncStorage.multiRemove(['TokenSpMedGroup','EmailUsuarioSpMedGroup','SenhaUsuarioSpMedGroup'])
						this.props.navigation.navigate('Login');
					}
				},
				{ text: 'Não' }
			]
		);
	}
	
	_verificarDados = async () => {
		await TokenValido().then(
			valido => {
				if (valido) {
					this._listarConsultas();
				} else {
					UsuarioLogado().then(
						usuario => {
							this._loginUsuario(usuario)
						}
					);
				}
			}
		)
	}

	_loginUsuario = async (usuario) => {
		await ApiRequest("Usuario/Login")
			.Cadastrar(usuario)
			.then(
				resultado => {
					switch (resultado.status) {
						case 200:
							resultado.json().then(
								resposta => {
									AsyncStorage.multiSet(
										[
											["TokenSpMedGroup", resposta.token],
											["EmailUsuarioSpMedGroup", usuario.email],
											["SenhaUsuarioSpMedGroup", usuario.senha]
										]
									)

								}
							);
							this._listarConsultas()
							break;
						default:
							this.props.navigation.navigate("AuthStack")
							break;
					}
				}
			)
			.catch(erro => console.warn(erro))
	}

	_listarConsultas = async () => {
		const token = await AsyncStorage.getItem('TokenSpMedGroup');
		this.setState({ usuarioLogado: jwt(token) })
		let endpoint;
		switch (this.state.usuarioLogado.Role) {
			case "Administrador":
				endpoint = "Consulta/Listar";
				break;
			case "Medico":
				endpoint = "Medico/VerConsultas";
				break;
			default:
				endpoint = "Paciente/VerConsultas";
				break;
		}

		await ApiRequest(endpoint)
			.Listar(token)
			.then(
				resultado => {
					switch (resultado.status) {
						case 200:
							resultado.json().then(
								resposta => {
									this.setState({ consultas: resposta })
								}
							);
							break;
						case 400:
						case 404:
							resultado.json().then(
								resposta => {
									this.setState({ erro: resposta })
								}
							);
							break;
						case 401:
							resultado.json().then(
								resposta => {
									this.setState({ erro: 'Você não pode visualizar nenhuma consulta' })
								}
							);
							break;
						default:
							break;
					}
					this.setState({ carregando: false })
				}
			).catch(error => console.error(error))
	}

	render() {
		const mensagem = this.state.consultas.length<1 && this.state.carregando !== null?(<Text style={styles.aviso}>Você não possui nenhuma consulta</Text>):null;
		return (
			<View>
				<ActivityIndicator size="large" color="#000000" animating={this.state.carregando} style={styles.loading} />
				<View>
					<FlatList
						data={this.state.consultas}
						keyExtractor={item => item.id.toString()}
						renderItem={
							(consulta) => 
							<Consulta consulta={consulta.item} tipoUsuario={this.state.usuarioLogado.Role} navigation ={this.props.navigation}/>
						}
						>
					</FlatList>
					
				</View>
			</View>
		);
	}
}
export default ListarConsultas;

const styles = StyleSheet.create(
	{
		loading: {
			position: 'absolute', left: '45%'
		},
		aviso:{
			marginVertical:10,
			fontSize:16,
			fontWeight:'400',
			textAlign:'center',

		}
	}
)
