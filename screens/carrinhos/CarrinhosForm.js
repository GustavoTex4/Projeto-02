import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { mask } from 'remask'
import carrinhoValidator from '../../validator/carrinhoValidator'


const CarrinhosForm = ({ navigation, route }) => {

  let carrinho = {
    nome: '',
    quantidade: '',
    preco: ''

  }
  const [selectedLanguage, setSelectedLanguage] = useState();
  const id = route.params?.id

  if (id >= 0) {
    carrinho = route.params?.carrinho
  }

  function salvar(dados) {

    AsyncStorage.getItem('carrinhos').then(resultado => {

      const carrinhos = JSON.parse(resultado) || []

      if (id >= 0) {
        carrinhos.splice(id, 1, dados)
      } else {
        carrinhos.push(dados)
      }

      AsyncStorage.setItem('carrinhos', JSON.stringify(carrinhos))

      navigation.goBack()
    })
  }

  return (
    <ScrollView style={{ margin: 15 }}>
      <Text>Formulário de carrinho</Text>

      <Formik
        initialValues={carrinho}
        validationSchema={carrinhoValidator}
        onSubmit={values => salvar(values)}
      >
        {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
          <View>
            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Nome'
              value={values.nome}
              onChangeText={handleChange('nome')}
            />
            {(errors.nome && touched.nome) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.nome}
              </Text>
            }
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
              onChangeText={handleChange('preco')}
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

export default CarrinhosForm