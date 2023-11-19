import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Card, Dialog, FAB, IconButton, MD3DarkTheme, Portal, Searchbar, Text, TextInput } from 'react-native-paper'


const Clientes = ({ navigation }) => {

  const [busca, setBusca] = useState('')

  const [clientes, setClientes] = useState([])
  const [idExcluir, setIdExcluir] = useState(0)

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  useFocusEffect(
    React.useCallback(() => {
      carregarDados()
    }, [])
  );

  function carregarDados() {
    AsyncStorage.getItem('clientes').then(resultado => {
      resultado = JSON.parse(resultado) || []
      setClientes(resultado)
    })
  }

  function confirmarExclusao(id) {
    setIdExcluir(id)
    setVisible(true)
  }

  function excluir() {
    clientes.splice(idExcluir, 1)
    AsyncStorage.setItem('clientes', JSON.stringify(clientes))
    carregarDados()
    setVisible(false)
  }

  const clientesFiltrados = clientes.filter((item) => item.nome.toLowerCase().includes(busca));

  return (
    <>
      <TextInput
        label="Pesquisar"
        value={busca}
        onChangeText={(text) => setBusca(text)}
        left={<TextInput.Icon icon="search" />}
      />

      <ScrollView style={{ padding: 15 }}>

        {clientesFiltrados.map((item, i) => (
          <Card key={i} mode='outlined' style={{ marginBottom: 10 }}>
            <Card.Content>
              <Text variant="titleLarge">{item.nome}</Text>
              <Text variant="bodyMedium">Telefone: {item.telefone} </Text>
              <Text variant="bodyMedium">Email: {item.email}</Text>
              <Text variant="bodyMedium">CPF: {item.cpf} </Text>
              <Text variant="bodyMedium">CEP: {item.cep}</Text>
              <Text variant="bodyMedium">Logradouro: {item.logradouro}</Text>
              <Text variant="bodyMedium">Complemento: {item.complemento}</Text>
              <Text variant="bodyMedium">Numero: {item.numero}</Text>
              <Text variant="bodyMedium">Bairro: {item.bairro}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon='pencil-outline'
                onPress={() => navigation.push('clientes-form', { id: i, cliente: item })}
              />
              <IconButton
                icon='trash-can-outline'
                onPress={() => confirmarExclusao(i)}
              />
            </Card.Actions>
          </Card>
        ))}

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <Text variant="bodyMedium">Deseja excluir?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={excluir}>Sim</Button>
              <Button onPress={hideDialog}>Não</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

      </ScrollView>

      <FAB
        icon="pencil-plus"
        size='small'
        style={{ position: 'absolute', right: 10, bottom: 10 }}
        onPress={() => navigation.push('clientes-form')}
      />
    </>
  )
}

export default Clientes