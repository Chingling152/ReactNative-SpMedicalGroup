import React, {Component} from 'react';
import {StyleSheet, Text, View , TouchableOpacity} from 'react-native';


class Consulta extends Component {
    constructor(props){
        super(props);
    }
    _informacaoMedico = () =>{
        let crm = this.props.consulta.idMedicoNavigation.crm;
        crm = crm.slice(0,5) + '-' + crm.slice(5,8)
        crm = /([0-9]{5})\-([A-Z]{2})/.test(crm)? crm: 'CRM Indisponivel';
        return (
            <View style={styles.informacoes}>
                <Text>{'Medico : '+this.props.consulta.idMedicoNavigation.nome}</Text>
                <Text>{'CRM : '+ crm}</Text>
                <Text>{'Especialidade : '+this.props.consulta.idMedicoNavigation.idEspecialidadeNavigation.nome}</Text>
            </View>
        )
    }

    _informacaoPaciente = () =>{
        let cpf = this.props.consulta.idPacienteNavigation.cpf;
        cpf = cpf.slice(0,3) + '.' + cpf.slice(3,6) + '.' + cpf.slice(6,9) + '-' + cpf.slice(9,11);
        cpf = /([0-9]{3})\.([0-9]{3})\.([0-9]{3})\-([0-9]{2})/.test(cpf)? cpf : "CPF Invalido";
        return (
            <View style={styles.informacoes}>
                <Text>{'Paciente : '+this.props.consulta.idPacienteNavigation.nome}</Text>
                <Text>{'CPF : '+ cpf}</Text>
                <Text>{'Data de Nascimento : ' + this.props.consulta.idPacienteNavigation.dataNascimento.split(' ')[0].replace(/-/g,'/')}</Text>
            </View>
        )
    }
    _verConsulta =() =>{
        this.props.navigation.navigate("Consulta",{idConsulta: this.props.consulta.id})
    }
    render() {
        let valorRetornado;
        switch (this.props.tipoUsuario) {
            case "Administrador":
                valorRetornado =(
                <View>
                    {this._informacaoMedico()}
                    {this._informacaoPaciente()}
                </View>)
                break;
            case "Medico":
                valorRetornado = this._informacaoPaciente();
                break;
            default:
                valorRetornado = this._informacaoMedico();
                break;
        }
        return (
        <View style={styles.consulta}>
                <Text style={styles.idConsulta}>{'Consulta #'+this.props.consulta.id}</Text>
                <View style={styles.consultaCorpo}>
                    {valorRetornado}
                    <View style={styles.informacoes}>
                        <Text style={styles.labelCampos}>{"Clinica : " + this.props.consulta.idMedicoNavigation.idClinicaNavigation.nomeFantasia}</Text>
                        <Text style={styles.labelCampos}>{"Situação da conslta : " + this.props.consulta.idMedicoNavigation.idClinicaNavigation.nomeFantasia}</Text>
                        <TouchableOpacity style={styles.botaoVerMais} onPress={() => this._verConsulta}>
                            <Text>Ver Mais Informações</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </View>
        );
    }
}
export default Consulta;

const styles = StyleSheet.create(
    {
        consulta:{
            marginVertical:10,
            marginHorizontal:25,
            borderTopWidth:1,
            borderTopColor:'black'
        },
        consultaCorpo:{
            paddingHorizontal:20,
        },
        informacoes:{
            marginVertical:5
        },
        idConsulta:{
            fontSize:20, 
            fontWeight:'600',
            alignSelf:'center',
            marginVertical:10
        },
        labelCampos:{
            fontWeight:'500',
            fontSize:14
        },
        botaoVerMais:{
            alignSelf:'center',
            marginTop:10,
            paddingTop:5
        }
    }
)