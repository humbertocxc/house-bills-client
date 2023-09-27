import * as Yup from 'yup'

const BillSchema = Yup.object().shape({
  dueDate: Yup.date().required('Campo obrigatório'),
  title: Yup.string()
    .max(100, 'Tamanho máximo excedido!')
    .required('Campo obrigatório!'),
  description: Yup.string()
    .max(100, 'Tamanho máximo excedido!')
    .nullable(),
  totalValue: Yup.number().required('Campo obrigatório!'),
  totalInstallments: Yup.number().nullable().default(1),
})

export default BillSchema
