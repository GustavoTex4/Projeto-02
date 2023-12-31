
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { mask } from 'remask'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import clienteValidator from '../../validator/clienteValidator'

const ClientesForm = ({ navigation, route }) => {

  let cliente = {
    nome: '',
    telefone: '',
    email: '',
    cpf: '',
    cep: '',
    logradouro: '',
    complemento: '',
    numero: '',
    bairro: '',
  }
  const id = route.params?.id

  if (id >= 0) {
    cliente = route.params?.cliente
  }

  function salvar(dados) {

    AsyncStorage.getItem('clientes').then(resultado => {

      const clientes = JSON.parse(resultado) || []

      if (id >= 0) {
        clientes.splice(id, 1, dados)
      } else {
        clientes.push(dados)
      }

      AsyncStorage.setItem('clientes', JSON.stringify(clientes))

      navigation.goBack()
    })
  }
  const buscarEnderecoPorCEP = async (cep, setFieldValue) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

      if (!data.erro) {
        setFieldValue('logradouro', data.logradouro || '');
        setFieldValue('complemento', data.complemento || '');
        setFieldValue('bairro', data.bairro || '');
        setFieldValue('uf', data.uf || '');
      }
    } catch (error) {
      console.error('Erro ao buscar endereço por CEP:', error);
    }
  };

  return (
    <ScrollView style={{ margin: 15 }}>
      <Text>Formulário de clientes</Text>

      <Formik
        initialValues={cliente}
        validationSchema={clienteValidator}
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
              label='Telefone'
              keyboardType='decimal-pad'
              value={values.telefone}
              onChangeText={(value) => { setFieldValue('telefone', mask(value, '(99) 9 9999-9999')) }}
            />
            {(errors.telefone && touched.telefone) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.telefone}
              </Text>
            }
            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Email'
              value={values.email}
              onChangeText={handleChange('email')}
            />
            {(errors.email && touched.email) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.email}
              </Text>
            }
            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='CPF'
              keyboardType='decimal-pad'
              value={values.cpf}
              onChangeText={(value) => { setFieldValue('cpf', mask(value, '999.999.999-99')) }}
            />
            {(errors.cpf && touched.cpf) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.cpf}
              </Text>
            }
            <TextInput
              style={{ margin: 10 }}
              mode='outlined'
              label='CEP'
              keyboardType='decimal-pad'
              value={values.cep}
              onChangeText={(value) => {
                setFieldValue('cep', mask(value, '99999-999'));
                if (value.length === 9) {
                  buscarEnderecoPorCEP(value, setFieldValue);
                }
              }}
            />
            {(errors.cep && touched.cep) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.cep}
              </Text>
            }
            <TextInput
              style={{ margin: 10 }}
              mode='outlined'
              label='Logradouro'
              value={values.logradouro}
              onChangeText={handleChange('logradouro')}
            />
             {(errors.logradouro && touched.logradouro) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.logradouro}

              </Text>
            }
            <TextInput
              style={{ margin: 10 }}
              mode='outlined'
              label='Complemento'
              value={values.complemento}
              onChangeText={handleChange('complemento')}
            />
            {(errors.complemento && touched.complemento) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.complemento}

              </Text>
            }
            <TextInput
              style={{ margin: 10 }}
              mode='outlined'
              label='Número'
              keyboardType='decimal-pad'
              value={values.numero}
              onChangeText={handleChange('numero')}
            />
            {(errors.numero && touched.numero) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.numero}

              </Text>
            }
            <TextInput
              style={{ margin: 10 }}
              mode='outlined'
              label='Bairro'
              value={values.bairro}
              onChangeText={handleChange('bairro')}
            />
             {(errors.bairro && touched.bairro) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.bairro}

              </Text>
            }
            <Button style={{ margin: 12, }} mode="contained" buttonColor='black' textColor='red' onPress={handleSubmit}>Salvar</Button>
          </View>
        )}

      </Formik>
    </ScrollView>
  )
}

export default ClientesForm