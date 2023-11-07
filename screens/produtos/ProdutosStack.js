import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Produtos from './Produtos';
import ProdutosForm from './ProdutosForm';

const Stack = createNativeStackNavigator();

const  ProdutosStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="produtos" component={Produtos} options={{ title: 'Produtos' }} />
        <Stack.Screen name="produtos-form" component={ProdutosForm} options={{ title: 'Produtos' }} />
      </Stack.Navigator>
    </>
  )
}

export default ProdutosStack