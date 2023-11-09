import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { mask } from 'remask'
import { Picker } from '@react-native-picker/picker'
import produtoValidator from '../../validator/produtoValidator'

const ProdutosForm = ({ navigation, route }) => {

  let produto = {
    nome: '',
    preco: '',
    quantidade: '',
    descricao: '',
    foto: ''
  }
  const [selectedLanguage, setSelectedLanguage] = useState();
  const id = route.params?.id

  if (id >= 0) {
    produto = route.params?.produto
  }

  function salvar(dados) {

    AsyncStorage.getItem('produtos').then(resultado => {

      const produtos = JSON.parse(resultado) || []

      if (id >= 0) {
        produtos.splice(id, 1, dados)
      } else {
        produtos.push(dados)
      }

      AsyncStorage.setItem('produtos', JSON.stringify(produtos))

      navigation.goBack()
    })
  }

  return (
    <ScrollView style={{ margin: 15 }}>
      <Text>Formulário de produtos</Text>

      <Formik
        initialValues={produto}
        validationSchema={produtoValidator}
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
              label='descricao'
              keyboardType='decimal-pad'
              value={values.descricao}
              onChangeText={handleChange('descricao')}
            />
            {(errors.descricao && touched.descricao) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.descricao}
              </Text>
            }
            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Foto'
              keyboardType='decimal-pad'
              value={values.foto}
              onChangeText={handleChange('foto')}
            />
            {(errors.foto && touched.foto) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.foto}
              </Text>
            }
            <Button style={{ margin: 12, }} mode="contained" buttonColor='black' textColor='red' onPress={handleSubmit}>Salvar</Button>
          </View>
        )}

      </Formik>
    </ScrollView>
  )
}

export default ProdutosForm