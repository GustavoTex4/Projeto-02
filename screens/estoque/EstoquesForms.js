import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { mask } from 'remask'
import { Picker } from '@react-native-picker/picker'
import estoqueValidator from '../../validator/estoqueValidator'
import { useEffect } from 'react'


const EstoquesForm = ({ navigation, route }) => {
  const [produto1, setProduto1] = useState([])
  let estoque = {
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
  useEffect(() => {
    AsyncStorage.getItem('produtos').then(resultado => {
      resultado = JSON.parse(resultado) || []
      setProduto1(resultado)
    })
  }, [])

  return (
    <ScrollView style={{ margin: 15 }}>
      <Text>Formulário de estoques</Text>

      <Formik
        initialValues={estoque}
        validationSchema={estoqueValidator}
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
              label='Preço'
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

export default EstoquesForm