import React, { Component } from 'react';
import { StyleSheet, Text, View, PermissionsAndroid ,TouchableOpacity} from 'react-native';
import { CustomConverter } from '../../services/converter';
import { ScrollView} from 'react-native-gesture-handler';
import MapView from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions';
import getDirections from 'react-native-google-maps-directions'
import { DefaultStyleSheet } from '../../assets/styles/padrao';
//import console = require('console');

const GOOGLE_MAPS_APIKEY = 'AIzaSyDDPoazTgN7nkmisG0To3i7zooKk3HoZRI';

class ListarConsulta extends Component {
	constructor(props) {
		super(props);
		this.state = {
			consulta: {
				idMedicoNavigation: {
					idClinicaNavigation: [],
					idEspecialidadeNavigation: []
				},
				idPacienteNavigation: []
			},
			origem: {
				latitude: null,
				longitude: null
			},
			destino: {
				latitude: null,
				longitude: null
			},
			erro: null,
			mapa: false
		}
	}

	componentDidMount() {
		this._permissaoUsuario();
		getDirections
	}

	_procurarClinica = () => {
		const clinica = this.props.navigation.getParam('consulta', null).idMedicoNavigation.idClinicaNavigation
		if (clinica.endereco !== null) {
			const endereco = `${clinica.endereco} , ${clinica.numero} - ${clinica.cep}`
			fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${endereco}&&key=${GOOGLE_MAPS_APIKEY}`)
				.then((resposta) =>
					resposta.json()
				).then(location => {
					console.warn(location)
					switch (location.status) {
						case 'OK':
							this.setState({
								//address: location.results[0].formatted_address,
								destino: {
									longitude: location.results[0].geometry.location.lng,
									latitude: location.results[0].geometry.location.lat
								}
							})
							break;
						case 'ZERO_RESULTS':
							this.setState({ erro: 'Local não encontrado' })
							break;
						case 'OVER_QUERY_LIMIT':
							this.setState({ erro: 'Limite de requisições atingido , tente mais tarde' })
							break
						default:
							break;
					}
				}
				).catch(erro => {
					this.setState({ erro: 'Não foi possivel encontrar este lugar' })
				})
		} else {
			console.warn('clinica')
		}
		//ZERO_RESULTS
		// OVER_QUERY_LIMIT
	}

	_permissaoUsuario = async () => {
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
				navigator.geolocation.getCurrentPosition(
					position => {
						this.setState({
							origem: {
								latitude: position.coords.latitude,
								longitude: position.coords.longitude
							},
							erro: null,
						});
						this._procurarClinica();
					},
					(error) => this.setState({ erro: error.message }),
					{ enableHighAccuracy: false, timeout: 2000, maximumAge: 1000 }
				);
			} else {
				this.setState({ erro: 'Habilite o GPS para saber como chegar a clinica' })
			}
			this.setState({ mapa: granted });
		} catch (err) {
			console.warn(err)
		}
	}

	_redirecionarUsuario = () =>{
		const data = {
            source: this.state.origem,
            destination: this.state.destino,
            params: [
                {
                  key: "travelmode",
                  value: "driving"
                }
            ]
        };
    
        getDirections(data)
	}

	_dadosMedico = () => {
		const medico = this.props.navigation.getParam('consulta', this.state.consulta).idMedicoNavigation;
		return (
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
		return (
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

	_dadosConsulta = () => {
		const { navigation } = this.props;
		const consulta = navigation.getParam('consulta', this.state.consulta)
		return (
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

	_dadosClinica = () => {
		const clinica = this.props.navigation.getParam('consulta', null).idMedicoNavigation.idClinicaNavigation;
		return (
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

	_dadosMapa = () => {
		if (!!this.state.origem.latitude &&
			!!this.state.origem.longitude &&
			!!this.state.destino.latitude &&
			!!this.state.destino.longitude
		) {
			return (
				<View>
					<View style={{ ...styles.informacoes, height: 300, paddingVertical: 30, backgroundColor: '#81df99' }}>
						<MapView style={StyleSheet.absoluteFillObject}
							region={
								{
									latitude: this.state.origem.latitude,
									longitude: this.state.origem.longitude,
									longitudeDelta: 0.1,
									latitudeDelta: 0.1
								}
							}
							loadingEnabled={true}
							toolbarEnabled={true}
							zoomControlEnabled={true}
						>
							<MapView.Marker ref={map => this.mapView = map}
								coordinate={
									{
										latitude: this.state.origem.latitude,
										longitude: this.state.origem.longitude
									}
								}>
								<MapView.Callout>
									<Text>Você está aqui</Text>
								</MapView.Callout>
							</MapView.Marker>

							<MapViewDirections
								origin={this.state.origem}
								destination={this.state.destino}
								apikey={GOOGLE_MAPS_APIKEY}
							/>

							<MapView.Marker
								coordinate={
									{
										latitude: this.state.destino.latitude,
										longitude: this.state.destino.longitude
									}
								}
							>
								<MapView.Callout>
									<Text>{this.props.navigation.getParam('consulta', null).idMedicoNavigation.idClinicaNavigation.nomeFantasia}</Text>
								</MapView.Callout>
							</MapView.Marker>
						</MapView>
					</View>
					<TouchableOpacity onPress={this._redirecionarUsuario} style={{...DefaultStyleSheet.greenButton,...DefaultStyleSheet.shadowContent}}>
						<Text style={{color:'#FFFFFF'}}>Clique para ver no Google Maps</Text>
					</TouchableOpacity>
					<View style={{ marginBottom: 50 }} />
				</View>
			)
		}
		else {
			return (
				<View style={styles.informacoes}>
					<Text style={DefaultStyleSheet.errorMessage}> {this.state.erro} </Text>
				</View>
			)
		}
	}

	render() {
		return (
			<View style={{ display: 'flex' }}>
				<ScrollView style={styles.dadosConsulta}>
					{this._dadosMedico()}
					{this._dadosPaciente()}
					{this._dadosClinica()}
					{this._dadosConsulta()}
					{this._dadosMapa()}
				</ScrollView>
			</View>
		);

	}
}
export default ListarConsulta;

const styles = StyleSheet.create(
	{
		dadosConsulta: {
			backgroundColor: 'white'
		},
		informacoes: {
			alignSelf: 'center',
			width: '80%',
			padding: 15,
		},
		titulo: {
			fontWeight: '800',
			textAlign: 'center',
			fontSize: 24,
			marginVertical: 10,
			borderBottomWidth: 1,
			borderBottomColor: 'black'
		},
		subtitulo: {
			fontSize: 20,
			fontWeight: '600',
		},
		conteudo: {
			fontSize: 16,
			fontWeight: '300',
		}
	}
)