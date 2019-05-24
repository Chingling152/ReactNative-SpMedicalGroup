import {StyleSheet} from 'react-native';

export const DefaultStyleSheet = StyleSheet.create(
    {
        errorMessage:{
            color:'red',
            fontWeight:'600',
            textAlign:'center',
            marginVertical:10
        },
        shadowContent:{
            shadowColor: "rgba(0,0,0, 0.4)",
            shadowOffset: { height: 10, width: 10 },
            shadowOpacity: 1, 
            shadowRadius: 1,
            elevation: 8,
        },
        greenButton:{
            backgroundColor:'#8beda4',
            alignSelf:'center',
            padding:10,
            borderColor:'#8beda4',
        }
    }
);