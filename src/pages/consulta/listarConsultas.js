import React, { Component } from 'react';

import { 
	StyleSheet, 
	Text, 
	View, 
	ActivityIndicator, 
	TouchableOpacity, 
	Alert
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'

import { TokenValido } from '../../services/auth';
import { ApiRequest } from '../../services/apiServices';

import Consulta from '../../componentes/Consultas/consulta';

import jwt from 'jwt-decode'

class ListarConsultas extends Component {
	constructor(props) {
		super(props);
		this.state = {
			consultas: [],
			carregando: true,
			usuarioLogado: [],
			erro:null
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
					this.props.navigation.navigate('Home')
				}
			}
		)
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
									if(resposta.length> 0){
										this.setState({ consultas: resposta })
									}else{
										this.setState({ erro: "Você não possui nenhuma consulta" })
									}
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
									this.setState({ erro: 'Você não esta autorizado a ver nenhuma consulta' })
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
	
		return (
			<View style={{flex:1}}>
				<ActivityIndicator size="large" color="#000000" animating={this.state.carregando} style={styles.loading} />
				<View >
					<FlatList
						data={this.state.consultas}
						keyExtractor={item => item.id.toString()}
						renderItem={
							(consulta) => <Consulta consulta={consulta.item} tipoUsuario={this.state.usuarioLogado.Role} navigation ={this.props.navigation}/>
						}
						>
					</FlatList>
					<Text style={styles.aviso}>{this.state.erro}</Text>
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
