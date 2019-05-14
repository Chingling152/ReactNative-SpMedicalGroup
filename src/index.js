import { createAppContainer, createSwitchNavigator, createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import Login from './pages/usuario/login';
import ListarConsulta from './pages/consulta/listarConsulta';
import ListarConsultas from './pages/consulta/listarConsultas';


const authStack = createStackNavigator(
	{
		Login:Login
	},
	{
		initialRouteName: "Login"
	}
)

const topNavigator = createStackNavigator(
	{
		"Consultas":{
			screen:ListarConsultas,
			path:'Usuario/Consultas',
			navigationOptions:{
				title: 'Minhas Consultas',
				headerStyle:{
					backgroundColor:'#81df99'
				},
				headerTitleStyle: {
					color: 'white'
				}
			},

		},
		"Consulta":{
			screen:ListarConsulta,
			path:'Usuario/Consulta/:idConsulta',
			navigationOptions: ({ navigation }) => ({
				title: `$Consulta #${navigation.state.params.idConsulta}'`,
			}),
		}
	},{
		initialRouteName:"Consultas"	
	}

);

export default createAppContainer(
  createSwitchNavigator(
    {
			"Login Usuario":authStack ,
			"Pagina Usuario":topNavigator
    },{
		initialRouteName:"Login Usuario"
	}
  )
)