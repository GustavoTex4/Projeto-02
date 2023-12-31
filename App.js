import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProdutosStack from './screens/produtos/ProdutosStack';
import PedidosStack from './screens/pedidos/PedidosStack';
import ClientesStack from './screens/clientes/ClientesStack';
import EstoquesStack from './screens/estoque/EstoquesStack';
import FuncionariosStack from './screens/funcionarios/FuncionariosStack';
import InicioStack from './screens/Inicio/InicioStack';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
             name="Início" 
             component={InicioStack}
             options={{
               tabBarIcon: () => (
                 <MaterialCommunityIcons name="folder-home" size={26} />
               ),
             }}
           />
            <Tab.Screen
              name="Produtos" 
              component={ProdutosStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="alpha-a-box" size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Pedidos" 
              component={PedidosStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="inbox-arrow-up" size={26} />
                ),
              }}
            />
             <Tab.Screen
              name="Clientes" 
              component={ClientesStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="account-box-multiple" size={26} />
                ),
              }}
            />
             <Tab.Screen
              name="Estoques" 
              component={EstoquesStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="inbox-arrow-down" size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Funcionários" 
              component={FuncionariosStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="account-box" size={26} />
                ),
              }}
            />
             
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}