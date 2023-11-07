import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Carrinhos from './Carrinhos';
import CarrinhosForm from './CarrinhosForm';
const Stack = createNativeStackNavigator();

const  CarrinhosStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="carrinhos" component={Carrinhos} options={{ title: 'Carrinhos' }} />
        <Stack.Screen name="carrinhos-form" component={CarrinhosForm} options={{ title: 'Carrinhos' }} />
      </Stack.Navigator>
    </>
  )
}

export default CarrinhosStack