import * as Yup from 'yup';

const funcionarioValidator = Yup.object().shape({
    nome: Yup.string()
        .min(2, 'Valor muito curto')
        .required('Campo obrigatório'),

    telefone: Yup.string()
    .min(8, 'Valor muito curto')
    .required('Campo obrigatório'),
    email: Yup.string()
    .min(1, 'Valor muito curto')
    .required('Campo obrigatório'),
    cpf: Yup.string()
    .required('Campo obrigatório'),
    cep: Yup.string()
    .required('Campo obrigatório'),
    estado: Yup.string()
    .required('Campo obrigatório'),
})

export default funcionarioValidator