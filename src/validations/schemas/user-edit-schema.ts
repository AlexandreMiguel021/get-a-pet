import { phoneRegex } from 'utils/regex/phone'
import { object, string } from 'yup'

const userEditSchema = object().shape({
	email: string().email('Por favor, insira um email Válido.'),
	phone: string().matches(
		phoneRegex,
		'Por favor, insira um número de telefone válido'
	),
	password: string().min(8, 'A senha precisa ter no mínimo 8 caracteres!')
})

export { userEditSchema }
