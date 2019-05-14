import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { TokenValido, UsuarioLogado } from '../../services/auth';
import { ApiRequest } from '../../services/apiServices';

class ListarConsultas extends Component {
  constructor(){
	super();
    this.state={
		consultas:[]
	}
  }
  componentDidMount() {
	TokenValido().then(
		valido=>{
			console.warn(valido)
			if(valido){
				const usuarioToken = jwt(AsyncStorage.getItem('UsuarioSpMedGroup'))
				console.warn(usuarioToken)
			}else{
				UsuarioLogado().then(
					
				);
			}
		}
	)
  }
  render() {
    return (
      <Text>Minhas Consultas</Text>
    );
  }
}
export default ListarConsultas;
