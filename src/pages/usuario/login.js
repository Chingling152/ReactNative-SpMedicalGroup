import React, {Component} from 'react';
import {StyleSheet, Text, View,Image,CheckBox} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';


class Login extends Component {
  _test = () => this.props.navigation.navigate("Consultas")
  render() {
    return (
      <View>
        <Image></Image>
        <Text>Login</Text>
        <View>
          <TextInput placeholder="seuemail@email.com"/>
          <TextInput placeholder="suasenha"/>
          <TouchableOpacity
          style={
            {
              width:"40%",
              height:40,
              backgroundColor:'yellow'
            }
          }
          onPress={this._test}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
        <CheckBox></CheckBox>
        <Text>Mensagem Erro</Text>
      </View>
    );
  }
}
export default Login;
