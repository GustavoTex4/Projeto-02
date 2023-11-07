import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Funcionarios from './Funcionarios';
import FuncionariosForm from './FuncionariosForm';

const Stack = createNativeStackNavigator();

const  FuncionariosStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="funcionarios" component={Funcionarios} options={{ title: 'Funcionarios' }} />
        <Stack.Screen name="funcionarios-form" component={FuncionariosForm} options={{ title: 'Funcionarios' }} />
      </Stack.Navigator>
    </>
  )
}

export default FuncionariosStack