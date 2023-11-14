import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Card, Dialog, FAB, IconButton, MD3DarkTheme, Portal, Searchbar, Text, TextInput } from 'react-native-paper'
import EstoquesForm from './EstoquesForms'


const Estoques = ({ navigation }) => {

  const [busca, setBusca] = useState('')

  const [estoques, setEstoques] = useState([])
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
    AsyncStorage.getItem('estoques').then(resultado => {
      resultado = JSON.parse(resultado) || []
      setEstoques(resultado)
    })
  }

  function confirmarExclusao(id) {
    setIdExcluir(id)
    setVisible(true)
  }

  function excluir() {
    estoques.splice(idExcluir, 1)
    AsyncStorage.setItem('estoques', JSON.stringify(estoques))
    carregarDados()
    setVisible(false)
  }

  const estoquesFiltrados = estoques.filter((item) => item.produto.toLowerCase().includes(busca));

  return (
    <>
      <TextInput
        label="Pesquisar"
        value={busca}
        onChangeText={(text) => setBusca(text)}
        left={<TextInput.Icon icon="search" />}
      />

      <ScrollView style={{ padding: 15 }}>

        {estoquesFiltrados.map((item, i) => (
          <Card key={i} mode='outlined' style={{ marginBottom: 10 }}>
            <Card.Content>
              <Text variant="titleLarge">{item.produto}</Text>
              <Text variant="bodyMedium">Quantidade: {item.quantidade}</Text>
              <Text variant="bodyMedium">Preço: {item.preco} </Text>
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon='pencil-outline'
                onPress={() => navigation.push('estoques-form', { id: i, estoque: item })}
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
        onPress={() => navigation.push('estoques-form')}
      />
    </>
  )
}

export default Estoques