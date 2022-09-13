import { phoneRegex } from 'utils/regex/phone'
import requiredMessage from 'utils/required-message'
import { object, string } from 'yup'

const userSignUpSchema = object().shape({
	name: string().required(requiredMessage('nome')).min(3),
	email: string()
		.required(requiredMessage('email'))
		.email('Por favor, insira um email Válido.'),
	phone: string()
		.required(requiredMessage('telefone'))
		.matches(phoneRegex, 'Por favor, insira um número de telefone válido'),
	password: string()
		.required(requiredMessage('senha'))
		.min(8, 'A senha precisa ter no mínimo 8 caracteres!')
})

export { userSignUpSchema }
