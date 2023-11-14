
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { mask } from 'remask'
import funcionarioValidator from '../../validator/funcionarioValidator'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const FuncionariosForm = ({ navigation, route }) => {

  const [endereco, setEndereco] = useState('')

  let funcionario = {
    nome: '',
    telefone: '',
    email: '',
    cpf: '',
    cep: '',
    localidade: '',
    logradouro:'',
    bairro: '',
  }
  const id = route.params?.id

  if (id >= 0) {
    funcionario = route.params?.funcionario
  }

  function salvar(dados) {

    AsyncStorage.getItem('funcionarios').then(resultado => {

      const funcionarios = JSON.parse(resultado) || []

      if (id >= 0) {
        funcionarios.splice(id, 1, dados)
      } else {
        funcionarios.push(dados)
      }

      AsyncStorage.setItem('funcionarios', JSON.stringify(funcionarios))

      navigation.goBack()
    })
  }
  function buscar(cep) {
    axios.get(`https://viacep.com.br/ws/${cep}/json/`).then(response => {
      setEndereco(response.data);
      console.log(response.data);
    })
    }
    console.log(funcionario.cep);
  return (
    <ScrollView style={{ margin: 15 }}>
      <Text>Formulário de funcionários</Text>

      <Formik
        initialValues={funcionario}
        validationSchema={funcionarioValidator}
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
              onChangeText={(value)=>{setFieldValue('telefone', mask(value, '(99) 9 9999-9999') )}}
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
              keyboardType='decimal-pad'
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
              onChangeText={(value)=>{setFieldValue('cpf', mask(value, '999.999.999-99') )}}
            />
            {(errors.cpf && touched.cpf) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.cpf}
              </Text>
            }
            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='CEP'
              keyboardType='number-pad'
              value={values.cep}
              onChangeText={handleChange('cep')}
            />
                <Button onPress={() => buscar(values.cep)}>busca</Button>
            {(errors.cep && touched.cep) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.cep}
              </Text>
            }
             <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Estado'
              keyboardType='decimal-pad'
              value={values.estado}
              onChangeText={handleChange('estado')}
            />
            {(errors.estado && touched.estado) &&
              <Text style={{ color: 'red', marginTop: 5 }}>
                {errors.estado}
              </Text>
            }
            <Button style={{ margin: 12, }} mode="contained" buttonColor='black' textColor='red' onPress={handleSubmit}>Salvar</Button>
          </View>
        )}
        

      </Formik>
    </ScrollView>
  )
}

export default FuncionariosForm