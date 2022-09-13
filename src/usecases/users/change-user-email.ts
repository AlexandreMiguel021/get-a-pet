import { ConflictException } from 'next-api-decorators'
import prisma from 'lib/prisma'

class ChangeUserEmail {
	async execute(email: string, id: string) {
		const isUsedEmailAddress = await prisma.user.findUnique({
			where: {
				email
			}
		})

		if (isUsedEmailAddress) {
			throw new ConflictException('This email address is already being used')
		}

		const updatedUserEmail = await prisma.user.update({
			where: {
				id
			},
			data: {
				email
			}
		})

		return updatedUserEmail
	}
}

export const changeUserEmail = new ChangeUserEmail()
