import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { mask } from 'remask'
import { Picker } from '@react-native-picker/picker'
import pedidoValidator from '../../validator/pedidoValidator'
import { useEffect } from 'react'


const PedidosForm = ({ navigation, route }) => {
  const [produto1, setProduto1] = useState([])
  let pedido = {
    quantidade: '',
    preco: ''

  }
  const [selectedLanguage, setSelectedLanguage] = useState();
  const id = route.params?.id

  if (id >= 0) {
    pedido = route.params?.pedido
  }

  function salvar(dados) {

    AsyncStorage.getItem('pedidos').then(resultado => {

      const pedidos = JSON.parse(resultado) || []

      if (id >= 0) {
        pedidos.splice(id, 1, dados)
      } else {
        pedidos.push(dados)
      }

      AsyncStorage.setItem('pedidos', JSON.stringify(pedidos))

      navigation.goBack()
    })
  }
  useEffect(() => {
    AsyncStorage.getItem('produtos').then(resultado => {
      resultado = JSON.parse(resultado) || []
      setProduto1(resultado)
    })
  }, [])

  return (
    <ScrollView style={{ margin: 15 }}>
      <Text>Formulário de pedidos</Text>

      <Formik
        initialValues={pedido}
        validationSchema={pedidoValidator}
        onSubmit={values => salvar(values)}

      >
        {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
          <View>
              <Picker
              selectedValue={values.produto}
              onValueChange={handleChange('produto')}>
              <Picker.Item label="Escolha o produto" value="" />
              {produto1.map((item,i)=>(
                <Picker.Item
                key={i}
                label={item.nome}
                value={item.nome} 
                />
                ))}
            </Picker>
              <TextInput
                style={{ marginTop: 10 }}
                mode='outlined'
                label='Quantidade'
                keyboardType='decimal-pad'
                value={values.quantidade}
                onChangeText={handleChange('quantidade')}
              />
              {(errors.quantidade && touched.quantidade) &&
                <Text style={{ color: 'red', marginTop: 5 }}>
                  {errors.quantidade}
                </Text>
              }
            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Preco'
              keyboardType='decimal-pad'
              value={values.preco}
              onChangeText={(value)=>{setFieldValue('preco', mask(value, 'R$ 99,99') )}}
            />
            {(errors.preco && touched.preco) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.preco}
              </Text>
            }
            <Button style={{ margin: 12, }} mode="contained" buttonColor='black' textColor='red' onPress={handleSubmit}>Salvar</Button>
          </View>
        )}

      </Formik>
    </ScrollView>
  )
}

export default PedidosForm