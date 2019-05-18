import React, { Component } from 'react';
import { Text , View , ActivityIndicator} from 'react-native';
import { TokenValido, UsuarioLogado } from '../services/auth';
import AsyncStorage from '@react-native-community/async-storage'
import { ApiRequest } from '../services/apiServices';

class Home extends Component {

    static navigationOptions = {
		header: null
	};

	constructor(props) {
		super(props);
		this.state = {
			email: "",
			senha: "",
			mensagem: "",
		};
	}

	componentDidMount() {
        this._validarApi();
    }
    
    _validarApi = async () =>{
        this.setState({mensagem:'Conectando-se...'})
        ApiRequest("").Listar().then(
            resultado =>{
                TokenValido().then(
                    valido => {
                        if (valido) {
                            this.props.navigation.navigate("Consultas")
                        } else {
                            this._buscarDados();
                        }
                    }
                )
            }
        ).catch(err => this.setState({mensagem:"Não foi possivel se conectar ao servidor\nTente novamente mais tarde"}))
    }

	_buscarDados = async () => {
        this.setState({mensagem:'Verificando dados...'})
		UsuarioLogado().then(
			usuario => {
				const email = usuario.email
                const senha = usuario.senha
				if (email !== null && senha !== null) {
					this.setState({
						email,
						senha
					});
					this._realizarLogin()
				}else{
                    this.props.navigation.navigate("Login")
                }
			}
		)
	}

	_realizarLogin = async () => {
		this.setState({ mensagem: "Fazendo login..." })
			this.setState({ carregando: true })
			await ApiRequest("Usuario/Login")
				.Cadastrar({
					email: this.state.email.trim(),
					senha: this.state.senha
				})
				.then(
					resultado => {
						switch (resultado.status) {
							case 200:
								resultado.json().then(
									resposta => {
										AsyncStorage.multiSet(
											[
												["TokenSpMedGroup", resposta.token],
												["EmailUsuarioSpMedGroup", this.state.email],
												["SenhaUsuarioSpMedGroup", this.state.senha]
											]
										)
										this.props.navigation.navigate("Consultas")
									}
								);
								break;
							case 404:
								resultado.json().then(
									resposta => {
										this.setState({ mensagem: "Falha ao logar automaticamente :\n"+resposta })
									}
                                );
								break;
							default:
								break;
                        }
                        this.props.navigation.navigate("Login")
					}
				)
				.catch(erro => {
					//console.warn(erro)
					this.setState({ mensagem: "Ocorreu um erro ao se conectar com o servidor" })
				})
	}
    render(){
        const carregador = 
		this.state.carregando?
		<ActivityIndicator size="large" color="#FFFFFF" animating={true}/>:
		null;
        return(
            <View style={{backgroundColor:'#8beda4',height:'100%',alignContent:'center',justifyContent: 'center'}}>
                {carregador}
                <Text style={{fontSize:30,color:'white',textAlign:'center'}}>{this.state.mensagem}</Text>
            </View>
        )
    }
}

export default Home;