import React from 'react'
import { Button, List, Modal, PaperProvider, Portal, Text } from 'react-native-paper'

const Inicio = ({navigation}) => {
    const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
  <>
  
  
  <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Este formulário destina-se a coletar informações cruciais para facilitar o processo de venda. Os campos incluem dados do cliente, como nome, endereço e informações de contato. Além disso, são solicitadas informações específicas sobre o produto ou serviço desejado, como quantidade, modelo e eventuais personalizações. </Text>
        </Modal>
      </Portal>
      <Button style={{marginTop: 30 ,margin: 12}} icon="book" mode="contained"  buttonColor='black' textColor='red' onPress={showModal}>
        Detalhes
      </Button>
    </PaperProvider>

  
  <Button style={{marginBottom:15, margin: 12}} icon="alpha-a-box" mode="contained"  buttonColor='black' textColor='red' onPress={() => navigation.push('produtos-form')}>
    Formulário de Produtos
  </Button>

  <Button style={{marginBottom:15, margin: 12}}  icon="inbox-arrow-up" mode="contained"  buttonColor='black' textColor='red' onPress={() => navigation.push('pedidos-form')}>
    Formulário de Pedidos
  </Button>

  <Button style={{marginBottom:15, margin: 12}}  icon="account-box-multiple" mode="contained"  buttonColor='black' textColor='red' onPress={() => navigation.push('clientes-form')}>
    Formulário de Cliente
  </Button>

  <Button style={{marginBottom:15, margin: 12}}  icon="inbox-arrow-down" mode="contained"  buttonColor='black' textColor='red' onPress={() => navigation.push('estoques-form')}>
    Formulário de Estoque
  </Button>

  <Button style={{marginBottom:15, margin: 12}}  icon="account-box" mode="contained"  buttonColor='black' textColor='red' onPress={() => navigation.push('funcionarios-form')}>
    Formulário de Funcionários
  </Button>


  
  
  
  
  
  
  
  
  </>
  )
}

export default Inicio