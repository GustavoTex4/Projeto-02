import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { mask } from 'remask'
import estoqueValidator from '../../validator/estoqueValidator'


const EstoquesForm = ({ navigation, route }) => {

  let estoque = {
    produto: '',
    sessao: '',
    quantidade: '',
    preco: ''

  }
  const [selectedLanguage, setSelectedLanguage] = useState();
  const id = route.params?.id

  if (id >= 0) {
    estoque = route.params?.estoque
  }

  function salvar(dados) {

    AsyncStorage.getItem('estoques').then(resultado => {

      const estoques = JSON.parse(resultado) || []

      if (id >= 0) {
        estoques.splice(id, 1, dados)
      } else {
        estoques.push(dados)
      }

      AsyncStorage.setItem('estoques', JSON.stringify(estoques))

      navigation.goBack()
    })
  }

  return (
    <ScrollView style={{ margin: 15 }}>
      <Text>Formulário de estoque</Text>

      <Formik
        initialValues={estoque}
        validationSchema={estoqueValidator}
        onSubmit={values => salvar(values)}
      >
        {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
          <View>
            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Produto'
              value={values.produto}
              onChangeText={handleChange('produto')}
            />
            {(errors.produto && touched.produto) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.produto}
              </Text>
            }
            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Sessao'
              value={values.sessao}
              onChangeText={handleChange('sessao')}
            />
            {(errors.sessao && touched.sessao) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.sessao}
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

export default EstoquesForm