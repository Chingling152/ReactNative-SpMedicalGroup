import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CustomConverter } from '../../services/converter';
import { ScrollView } from 'react-native-gesture-handler';
//import console = require('console');


class ListarConsulta extends Component {
	constructor(props) {
		super(props);
		this.state={
			consulta:[]
		}
	}

	_dadosMedico = () =>{
		const medico = this.props.navigation.getParam('consulta', null).idMedicoNavigation;
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
		const paciente = this.props.navigation.getParam('consulta', null).idPacienteNavigation;
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
		const consulta = navigation.getParam('consulta', null)
		return(
			<View style={styles.informacoes}>
				<Text style={styles.titulo}>Consulta</Text>
				<View>
					<Text style={styles.subtitulo}>{'Situação : '}
					<Text style={styles.conteudo}>{consulta.statusConsulta}</Text>
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
			return (
				<View style={{display:'flex'}}>
					<ScrollView style={styles.dadosConsulta}>
						{this._dadosMedico()} 
						{this._dadosPaciente()} 
						{this._dadosClinica()} 
						{this._dadosConsulta()} 
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