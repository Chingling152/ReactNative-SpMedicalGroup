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

const topNavigator = createMaterialTopTabNavigator(
	{
		"Consultas":ListarConsultas,
		"Consulta":ListarConsulta
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