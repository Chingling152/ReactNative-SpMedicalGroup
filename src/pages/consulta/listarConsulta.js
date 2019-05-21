import React, { Component } from 'react';
import { StyleSheet, Text, View , PermissionsAndroid} from 'react-native';
import { CustomConverter } from '../../services/converter';
import { ScrollView } from 'react-native-gesture-handler';
import MapView from 'react-native-maps'	
//import console = require('console');

const GOOGLE_MAPS_APIKEY = 'AIzaSyBY334k222jW-9d5JLxBu5L_BM-Fe5mXtA';

class ListarConsulta extends Component {
	constructor(props) {
		super(props);
		this.state={
			consulta:{
				idMedicoNavigation:{
					idClinicaNavigation:[]
				},
				idPacienteNavigation:[]
			},
			latitude: null,
			longitude: null,
			erro:null,
			mapa:false
		}
	}
	
	componentDidMount() {
		this._permissaoUsuario()
	}

	_permissaoUsuario = async ()=> {
		try {
			const granted = await PermissionsAndroid.request(
			  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			  {
					'title': 'Permissão de localização',
					'message': 'Esse aplicativo quer saber sua localização atual ',
					buttonNeutral: 'Não',
				  	buttonNegative: 'Não e não pergunte novamente',
				  	buttonPositive: 'Sim',
			  }
			)
			
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			  navigator.geolocation.watchPosition(
				  position => {
					console.warn(position);
					this.setState({
					  latitude: position.coords.latitude,
					  longitude: position.coords.longitude,
					  erro: null,
					});
				  },
				  (error) => this.setState({ erro: error.message }),
				  { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
			  );
			} else {
			  this.setState({erro:'Habilite o GPS para saber como chegar a clinica'})
			}
			this.setState({mapa:granted});
		  } catch (err) {
			console.warn(err)
		  }
		  /*
		
		navigator.geolocation.getCurrentPosition(
			position=> console.warn(position),
			erro => console.warn(erro),
		)*/
		/*
		PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(
			resultado =>{
				if(!resultado){
					const granted = PermissionsAndroid.request(
						PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
						{
							'title': 'Permissão de localização',
							'message': 'Esse aplicativo quer saber sua localização atual ',
							buttonNeutral: 'Não',
							buttonNegative: 'Não e não pergunte denovo',
							buttonPositive: 'Sim',
						}
					  ).then(
						  i =>{
							  console.warn(i)
						  }
					  )
				}
			}
		)*//*
			try {
			  const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
				  	'title': 'Permissão de localização',
				  	'message': 'Esse aplicativo quer saber sua localização atual ',
				  	buttonNeutral: 'Não',
					buttonNegative: 'Não e não pergunte denovo',
					buttonPositive: 'Sim',
				}
			  )
			  
			  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.warn("Obrigado!!!");
				navigator.geolocation.getCurrentPosition(
					position => {
					  console.warn(position);
					  this.setState({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						erro: null,
					  });
					},
					(error) => this.setState({ erro: error.message }),
					{ enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
				);
			  } else {
				console.warn(granted)
			  }
			} catch (err) {
			  console.warn(err)
			}*/
		  }

	_dadosMedico = () =>{
		const medico = this.props.navigation.getParam('consulta', this.state.consulta).idMedicoNavigation;
		return(
		<View style={styles.informacoes}>
			<Text style={styles.titulo}>Medico</Text>
			<View>
				<Text style={styles.subtitulo}>{'Nome : '}
				<Text style={styles.conteudo}>{medico.nome}</Text>
				</Text>
			</View>
			<View>
				<Text style={styles.subtitulo}>{'CRM : '}
				<Text style={styles.conteudo}>{CustomConverter(medico.crm).toCrm()}</Text>
				</Text>
			</View>
			<View>
				<Text style={styles.subtitulo}>{'Especialidade : '}
				<Text style={styles.conteudo}>{medico.idEspecialidadeNavigation.nome}</Text>
				</Text>
			</View>
		</View>
		)
	}

	_dadosPaciente = () => {
		const paciente = this.props.navigation.getParam('consulta', this.state.consulta).idPacienteNavigation;
		const dataNascimento = CustomConverter(paciente.dataNascimento).toDate()
		return(
		<View style={styles.informacoes}>
			<Text style={styles.titulo}>Paciente</Text>
			<View>
				<Text style={styles.subtitulo}>{'Nome : '}
				<Text style={styles.conteudo}>{paciente.nome}</Text>
				</Text>
			</View>
			<View>
				<Text style={styles.subtitulo}>{'CPF : '}
				<Text style={styles.conteudo}>{CustomConverter(paciente.cpf).toCpf()}</Text>
				</Text>
			</View>
			<View>
				<Text style={styles.subtitulo}>{'Data de nascimento : '}
				<Text style={styles.conteudo}>{dataNascimento}</Text>
				</Text>
			</View>
			<View>
				<Text style={styles.subtitulo}>{'Idade : '}
				<Text style={styles.conteudo}>{CustomConverter(dataNascimento).toAge()}</Text>
				</Text>
			</View>
			<View>
				<Text style={styles.subtitulo}>{'Telefone : '}
				<Text style={styles.conteudo}>{CustomConverter(paciente.telefone).toPhone()}</Text>
				</Text>
			</View>
		</View>
		)
	}

	_dadosConsulta = () =>{
		const { navigation } = this.props;
		const consulta = navigation.getParam('consulta', this.state.consulta)
		return(
			<View style={styles.informacoes}>
				<Text style={styles.titulo}>Consulta</Text>
				<View>
					<Text style={styles.subtitulo}>{'Situação : '}
					<Text style={styles.conteudo}>{consulta.statusConsulta}</Text>
					</Text>
				</View>
				<View>
					<Text style={styles.subtitulo}>{'Data da Consulta : '}
					<Text style={styles.conteudo}>{CustomConverter(consulta.dataConsulta).toDate()}</Text>
					</Text>
					<Text style={styles.subtitulo}>{'Horario : '}
					<Text style={styles.conteudo}>{consulta.dataConsulta.split(' ')[1]}</Text>
					</Text>
				</View>
				<View>
					<Text style={styles.subtitulo}>{'Descrição : '}
					<Text style={styles.conteudo}>{consulta.descricao}</Text>
					</Text>
				</View>
			</View>
		)
	}

	_dadosClinica = () =>{
		const clinica = this.props.navigation.getParam('consulta', null).idMedicoNavigation.idClinicaNavigation;
		return(
			<View style={styles.informacoes}>
				<Text style={styles.titulo}>Clinica</Text>
				<View>
					<Text style={styles.subtitulo}>{'Nome : '}
						<Text style={styles.conteudo}>{clinica.nomeFantasia}</Text>
					</Text>
				</View>
				<View>
					<Text style={styles.subtitulo}>{'Endereço : '}
					<Text style={styles.conteudo}>{`${clinica.endereco} , ${clinica.numero} - ${CustomConverter(clinica.cep).toPostalCode()}`}</Text>
					</Text>
				</View>
			</View>
		)
	}
	
	render() {
		console.warn(
			{
				latitude:this.state.latitude,
				longitude:this.state.longitude
			}
		)

		
			return (
				<View style={{display:'flex'}}>
					<ScrollView style={styles.dadosConsulta}>
						{this._dadosMedico()} 
						{this._dadosPaciente()} 
						{this._dadosClinica()} 
						{this._dadosConsulta()} 
						{/*this._dadosMapa()*/}
						<View>
							<Text>Teste</Text>
							<Text> {this.state.latitude} </Text>
							<Text> {this.state.longitude} </Text>
							<Text> {this.state.erro} </Text>
						</View>
						<View>
							<MapView style={StyleSheet.absoluteFillObject}>
							{
								this.state.mapa && !!this.state.latitude && !!this.state.longitude &&
							(<MapView.Marker coordinate={
									{
										latitude:this.state.latitude,
										longitude:this.state.longitude
									}
								} 
							/>)
							}
							</MapView>
      					</View>
					</ScrollView>
				</View>
			);
	
	}
}
export default ListarConsulta;

const styles = StyleSheet.create(
	{
		dadosConsulta:{
			backgroundColor:'white'
		},
		informacoes:{
			alignSelf:'center',
			width:'80%',
			padding:15,
		},
		titulo:{
			fontWeight:'800',
			textAlign:'center',
			fontSize:24,
			marginVertical:10,
			borderBottomWidth:1,
			borderBottomColor:'black'
		},
		subtitulo:{
			fontSize:20,
			fontWeight:'600',
		},
		conteudo:{
			fontSize:16,
			fontWeight:'300',
		}
	}
)