import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';


class ListarConsulta extends Component {
	constructor(props) {
		super(props);
		this.state={
			consulta:[]
		}
	}
	
	componentDidMount(){
		const { navigation } = this.props;
 
		this.setState({consulta:navigation.getParam('consulta', null)})
	}

	render() {
		return (
			<Text>Listar Consulta</Text>
		);
	}
}
export default ListarConsulta;
