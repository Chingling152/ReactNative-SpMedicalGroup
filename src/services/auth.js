import AsyncStorage from '@react-native-community/async-storage'
import jwt from 'jwt-decode';

export const TokenUsuario = async () => await AsyncStorage.getItem('TokenSpMedGroup');

export const TokenValido = async () =>
    TokenUsuario().then(token => {
        if (token !== null) {
            var decode = jwt(token);
            if (Date.now() <= decode.exp * 1000) {
                return true;
            }
        }
        return false
    }

    );

export const UsuarioLogado = async () =>  {
   const objeto = await AsyncStorage.multiGet(['EmailUsuarioSpMedGroup', 'SenhaUsuarioSpMedGroup']);
    return {
        email:objeto[0][1],
        senha:objeto[1][1]
    }
}