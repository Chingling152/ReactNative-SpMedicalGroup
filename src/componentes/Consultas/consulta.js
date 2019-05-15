import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';


class Consulta extends Component {
    constructor(props){
        super(props);
    }
    _informacaoMedico = () =>(
        <View>
            <Text>{'Medico : '+this.props.consulta.idMedicoNavigation.nome}</Text>
            <Text>{'CRM : '+this.props.consulta.idMedicoNavigation.crm}</Text>
            <Text>{'Especialidade : '+this.props.consulta.idMedicoNavigation.idEspecialidadeNavigation.nome}</Text>
        </View>
    )

    _informacaoPaciente = () =>(
        <View>
            <Text>{'Paciente : '+this.props.consulta.idPacienteNavigation.nome}</Text>
            <Text>{'CPF : '+this.props.consulta.idPacienteNavigation.cpf}</Text>
            <Text>{'Data de Nascimento : ' + this.props.consulta.idPacienteNavigation.dataNascimento.split(' ')[0].replace(/-/g,'/')}</Text>
        </View>
    )
    render() {
        let valorRetornado;
        switch (this.props.tipoUsuario) {
            case "Administrador":
                valorRetornado =(
                <View>
                    {this._informacaoMedico()}
                    {this._informacaoPaciente()}
                </View>)
            case "Medico":
                valorRetornado = this._informacaoPaciente();
            default:
                valorRetornado = this._informacaoMedico();
        }
        return (
        <View>
            <View>
                <Text>{'Consulta #'+this.props.consulta.id}</Text>
                {valorRetornado}
                <Text>{"Clinica : " + this.props.consulta.idMedicoNavigation.idClinicaNavigation.nomeFantasia}</Text>
            </View>
        </View>
        );
    }
}
export default Consulta;
