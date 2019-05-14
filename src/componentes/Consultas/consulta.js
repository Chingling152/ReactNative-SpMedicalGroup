import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';


class Consulta extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
        <View>
            <View>
                <Text>{'Consulta #'+this.props.id}</Text>
            </View>
        </View>
        );
    }
}
export default Consulta;
