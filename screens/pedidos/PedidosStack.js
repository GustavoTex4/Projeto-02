import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Pedidos from './Pedidos';
import PedidosForm from './PedidosForm';
const Stack = createNativeStackNavigator();

const PedidosStack= () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="pedidos" component={Pedidos} options={{ title: 'Pedidos' }} />
        <Stack.Screen name="pedidos-form" component={PedidosForm} options={{ title: 'Pedidos' }} />
      </Stack.Navigator>
    </>
  )
}

export default PedidosStack