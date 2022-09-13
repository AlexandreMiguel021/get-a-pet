import requiredMessage from 'utils/required-message'
import { object, string } from 'yup'

const userSigninSchema = object().shape({
	email: string()
		.required(requiredMessage('email'))
		.email('Por favor, insira um email Válido.'),
	password: string().required(requiredMessage('senha'))
})

export { userSigninSchema }
