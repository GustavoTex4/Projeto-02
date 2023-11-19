import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Inicio from './Inicio';
import ProdutosForm from '../produtos/ProdutosForm';
import PedidosForm from '../pedidos/PedidosForm';
import ClientesForm from '../clientes/ClientesForm';
import FuncionariosForm from '../funcionarios/FuncionariosForm';
import EstoquesForm from '../estoque/EstoquesForms';

const Stack = createNativeStackNavigator();

const  InicioStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="inicio" component={Inicio} options={{ title: 'Início' }} />
        <Stack.Screen name="produtos-form" component={ProdutosForm} options={{ title: 'Produtos' }} />
        <Stack.Screen name="pedidos-form" component={PedidosForm} options={{ title: 'Pedidos' }} />
        <Stack.Screen name="clientes-form" component={ClientesForm} options={{ title: 'Clientes' }} />
        <Stack.Screen name="estoques-form" component={EstoquesForm} options={{ title: 'Estoques' }} />
        <Stack.Screen name="funcionarios-form" component={FuncionariosForm} options={{ title: 'Funcionarios' }} />
      </Stack.Navigator>
    </>
  )
}

export default InicioStack