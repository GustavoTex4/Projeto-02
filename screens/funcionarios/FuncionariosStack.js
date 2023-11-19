import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Funcionarios from './Funcionarios';
import FuncionariosForm from './FuncionariosForm';

const Stack = createNativeStackNavigator();

const  FuncionariosStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="funcionarios" component={Funcionarios} options={{ title: 'Funcionários' }} />
        <Stack.Screen name="funcionarios-form" component={FuncionariosForm} options={{ title: 'Funcionários' }} />
      </Stack.Navigator>
    </>
  )
}

export default FuncionariosStack