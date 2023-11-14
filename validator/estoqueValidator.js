import * as Yup from 'yup';

const estoqueValidator = Yup.object().shape({
    produto: Yup.string()
        .min(1, 'Valor muito curto')
        .required('Campo obrigatório'),

    quantidade: Yup.number()
        .min(1, 'Valor muito curto')
        .required('Campo obrigatório'),
    preco: Yup.string()
        .min(5, 'Valor muito curto')
        .required('Campo obrigatório')

})

export default estoqueValidator