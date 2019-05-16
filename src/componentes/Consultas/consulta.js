import React, {Component} from 'react';
import {StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import { DefaultStyleSheet } from '../../assets/styles/padrao';

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
                <Text style={styles.labelCampo}>
                    {'Medico : '}
                    <Text style={styles.valorCampo}>
                        {this.props.consulta.idMedicoNavigation.nome}
                    </Text>     
                </Text>
                <Text style={styles.labelCampo}>
                    {'CRM : '} 
                    <Text style={styles.valorCampo}>
                        {crm}
                    </Text>     
                </Text>
                <Text style={styles.labelCampo}>
                    {'Especialidade : '} 
                    <Text style={styles.valorCampo}>
                        {this.props.consulta.idMedicoNavigation.idEspecialidadeNavigation.nome}
                    </Text>     
                </Text>
            </View>
        )
    }

    _informacaoPaciente = () =>{
        let cpf = this.props.consulta.idPacienteNavigation.cpf;
        cpf = cpf.slice(0,3) + '.' + cpf.slice(3,6) + '.' + cpf.slice(6,9) + '-' + cpf.slice(9,11);
        cpf = /([0-9]{3})\.([0-9]{3})\.([0-9]{3})\-([0-9]{2})/.test(cpf)? cpf : "CPF Indisponivel";

        let dataNascimento =this.props.consulta.idPacienteNavigation.dataNascimento.split(' ')[0].replace(/-/g,'/');
        let idade = parseInt(2019) - parseInt(dataNascimento.split("/")[2]);
        return (
            <View style={styles.informacoes}>
                <Text style={styles.labelCampo}>
                    {'Paciente : '} 
                    <Text style={styles.valorCampo}>
                        {this.props.consulta.idPacienteNavigation.nome}
                    </Text>
                </Text>
                <Text style={styles.labelCampo}>
                    {'CPF : '}
                    <Text style={styles.valorCampo}> 
                        {cpf}
                    </Text>
                </Text>
                <Text style={styles.labelCampo}>
                    {'Data de Nascimento : '} 
                    <Text style={styles.valorCampo}> 
                    {dataNascimento + ` (${idade} ${ idade >1 ? 'anos' : 'ano'})` }
                    </Text>
                </Text>
            </View>
        )
    }

    _informacoesConsulta = () =>{
        let descricao = this.props.consulta.descricao;

        descricao = descricao != null? descricao.split(0,114)[0] + '...' : 'Sem descrição disponivel';
        return (
        <View style={styles.informacoes}>
                        <Text style={styles.labelCampo}>
                            {'Clinica : '}
                            <Text style={styles.valorCampo}>
                                {this.props.consulta.idMedicoNavigation.idClinicaNavigation.nomeFantasia}
                            </Text>
                        </Text>
                        <Text style={styles.labelCampo}>
                            {'Situação da consulta : '}
                            <Text style={styles.valorCampo}>
                                {this.props.consulta.statusConsulta}
                            </Text>
                        </Text>
                        <View style={{marginHorizontal:40,marginVertical:15,borderTopColor:'gray',borderTopWidth:1,padding:10}}>
                            <Text style={{...styles.labelCampo,alignSelf:'center'}}>
                                Descrição
                            </Text>
                            <Text style={{...styles.valorCampo,alignSelf:'center',textAlign:'center'}}>
                                {descricao}
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.botaoVerMais} onPress={this._verConsulta} activeOpacity={0.8}>
                            <Text style={{color:'#FFFFFF'}}>Ver Mais Informações</Text>
                        </TouchableOpacity>
                    </View>
                    )
    }
    _verConsulta =() =>{
        this.props.listar.current();
        console.warn("aa")
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
        const valorConsulta = this._informacoesConsulta();
        return (
        <View style={styles.consulta}>
                <Text style={styles.idConsulta}>{'Consulta #'+this.props.consulta.id}</Text>
                <View style={styles.consultaCorpo}>
                    {valorRetornado}
                    {valorConsulta}
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
        labelCampo:{
            fontWeight:'500',
            fontSize:15
        },
        valorCampo:{
            fontWeight:'300',
            fontSize:15
        },
        botaoVerMais:{
            backgroundColor:'#8beda4',
            alignSelf:'center',
            padding:10,
            borderColor:'#8beda4',
            ...DefaultStyleSheet.shadowContent
        }
    }
)