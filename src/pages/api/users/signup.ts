import { Body, Catch, createHandler, HttpCode, Post } from 'next-api-decorators'
import { signUp } from 'usecases/users'
import exceptionHandler from 'utils/exception-handler'
import { userEditSchema } from 'validations/schemas/user-edit-schema'

export type UserSingUpDTO = {
	name: string
	email: string
	password: string
	phone: string
}

class SignUpHandler {
	@Post()
	@HttpCode(201)
	@Catch(exceptionHandler)
	public async sigUp(@Body() body: UserSingUpDTO) {
		await userEditSchema.validate(body)
		const accessToken = await signUp.execute(body)

		return { accessToken }
	}
}

export default createHandler(SignUpHandler)
