import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CustomConverter } from '../../services/converter';
//import console = require('console');


class ListarConsulta extends Component {
	constructor(props) {
		super(props);
		this.state={
			consulta:[]
		}
	}
	

	_dadosMedico = () =>{
		const { navigation } = this.props;
		const consulta = navigation.getParam('consulta', null)
		return(
		<View>
			<Text>Medico</Text>
				<Text>{consulta.idMedicoNavigation.nome}</Text>
				<Text>{CustomConverter(consulta.idMedicoNavigation.crm).toCrm()}</Text>
				<Text>{consulta.idMedicoNavigation.idEspecialidadeNavigation.nome}</Text>
		</View>
		)
	}

	_dadosPaciente = () => {
		const { navigation } = this.props;
		const consulta = navigation.getParam('consulta', null)
		return(
		<View>
			<Text>Paciente</Text>
				<Text>{consulta.idPacienteNavigation.nome}</Text>
				<Text>{CustomConverter(consulta.idPacienteNavigation.cpf).toCpf()}</Text>
				<Text>{consulta.idPacienteNavigation.dataNascimento}</Text>
				<Text>{consulta.idPacienteNavigation.telefone}</Text>
		</View>
		)
	}

	_dadosConsulta = () =>{
		const { navigation } = this.props;
		const consulta = navigation.getParam('consulta', null)
		return(
			<View>
				<Text>Descrição</Text>
				<Text>{consulta.descricao}</Text>
				<Text>Situação</Text>
				<Text></Text>
			</View>
		)
	}
	
	render() {
			return (
				<View>
					{this._dadosMedico()} 
					{this._dadosPaciente()} 
				</View>
			);
	
	}
}
export default ListarConsulta;

const styles = StyleSheet.create(
	{

	}
)