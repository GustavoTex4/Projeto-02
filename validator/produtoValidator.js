import * as Yup from 'yup';

const produtoValidator = Yup.object().shape({
    nome: Yup.string()
        .min(2, 'Valor muito curto')
        .required('Campo obrigatório'),

    preco: Yup.number()
    .min(5, 'Valor muito curto')
    .required('Campo obrigatório'),
    quantidade: Yup.number()
    .min(1, 'Valor muito curto')
    .required('Campo obrigatório'),
    descricao: Yup.string()
    .required('Campo obrigatório'),
    foto: Yup.string()
    .required('Campo obrigatório'),
})

export default produtoValidator