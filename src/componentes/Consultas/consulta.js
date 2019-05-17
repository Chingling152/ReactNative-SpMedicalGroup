import React, {Component} from 'react';
import {StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import { DefaultStyleSheet } from '../../assets/styles/padrao';
import { CustomConverter } from '../../services/converter';

class Consulta extends Component {
    constructor(props){
        super(props);
    }
    _informacaoMedico = () =>{
        let crm = CustomConverter(this.props.consulta.idMedicoNavigation.crm).toCrm();
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
        let cpf = CustomConverter(this.props.consulta.idPacienteNavigation.cpf).toCpf();    
        let dataNascimento = CustomConverter(this.props.consulta.idPacienteNavigation.dataNascimento).toDate();
        let idade = CustomConverter(dataNascimento).toAge();
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
                    {dataNascimento + ` (${idade})`}
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
                            {'Data da consulta : '}
                            <Text style={styles.valorCampo}>
                                {this.props.consulta.dataConsulta}
                            </Text>
                        </Text>
                        <Text style={styles.labelCampo}>
                            {'Situação da consulta : '}
                            <Text style={styles.valorCampo}>
                                {this.props.consulta.statusConsulta}
                            </Text>
                        </Text>
                        <View style={{marginHorizontal:40,marginVertical:15,borderTopColor:'gray',borderTopWidth:1,padding:10}}>
                            <Text style={{...styles.labelCampo,alignSelf:'center',fontSize:20}}>
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
        this.props.navigation.navigate('Consulta',{consulta:this.props.consulta})
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