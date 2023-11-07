import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import EstoquesForms from './EstoquesForms';
import Estoques from './Estoques';

const Stack = createNativeStackNavigator();

const  EstoquesStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="estoques" component={Estoques} options={{ title: 'Estoques' }} />
        <Stack.Screen name="estoques-form" component={EstoquesForms} options={{ title: 'Estoques' }} />
      </Stack.Navigator>
    </>
  )
}

export default EstoquesStack