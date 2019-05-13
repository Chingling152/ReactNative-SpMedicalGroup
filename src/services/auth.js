import {AsyncStorage } from "react-native"
import jwt from 'jwt-decode';

export const TokenUsuario = async () =>  await AsyncStorage.getItem('UsuarioSpMedGroup');

export const TokenValido = async () =>
    TokenUsuario().then(token => {
        //console.warn(token)
        if (token !== null) {
            var decode = jwt(token);
            //console.warn(decode.exp * 1000 + "\n" + Date.now())
            if (Date.now() <= decode.exp * 1000) {
                return true;
            }
        }
        return false
    }

    );