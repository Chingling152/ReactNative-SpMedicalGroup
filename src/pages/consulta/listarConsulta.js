import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';


class ListarConsulta extends Component {
	constructor(props) {
		super(props);
		this.state={
			consultas:[]
		}
	}
	render() {
		return (
			<Text>Listar Consulta</Text>
		);
	}
}
export default ListarConsulta;
