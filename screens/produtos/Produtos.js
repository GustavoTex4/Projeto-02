import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Card, Dialog, FAB, IconButton, MD3DarkTheme, Portal, Searchbar, Text, TextInput } from 'react-native-paper'


const Produtos = ({ navigation }) => {

  const [busca, setBusca] = useState('')

  const [produtos, setProdutos] = useState([])
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
    AsyncStorage.getItem('produtos').then(resultado => {
      resultado = JSON.parse(resultado) || []
      setProdutos(resultado)
    })
  }

  function confirmarExclusao(id) {
    setIdExcluir(id)
    setVisible(true)
  }

  function excluir() {
    produtos.splice(idExcluir, 1)
    AsyncStorage.setItem('produtos', JSON.stringify(produtos))
    carregarDados()
    setVisible(false)
  }

  const produtossFiltrados = produtos.filter((item) => item.nome.toLowerCase().includes(busca));

  return (
    <>
      <TextInput
        label="Pesquisar"
        value={busca}
        onChangeText={(text) => setBusca(text)}
        left={<TextInput.Icon icon="search" />}
      />

      <ScrollView style={{ padding: 15 }}>

        {produtossFiltrados.map((item, i) => (
          <Card key={i} mode='outlined' style={{ marginBottom: 10 }}>
            <Card.Content>
              <Text variant="titleLarge">{item.nome}</Text>
              <Text variant="bodyMedium">Preço: {item.preco} </Text>
              <Text variant="bodyMedium">Quantidade: {item.quantidade}</Text>
              <Text variant="bodyMedium">Descrição: {item.descricao} </Text>
              <Text variant="bodyMedium">Foto: {item.foto}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon='pencil-outline'
                onPress={() => navigation.push('produtos-form', { id: i, produto: item })}
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
        onPress={() => navigation.push('produtos-form')}
      />
    </>
  )
}

export default Produtos