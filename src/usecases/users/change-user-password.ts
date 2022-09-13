import encryptPassword from 'utils/encrypt-password'
import prisma from 'lib/prisma'

class ChangeUserPassword {
	async execute(password: string, id: string) {
		const passwordHash = await encryptPassword(password)

		await prisma.user.update({
			where: {
				id
			},
			data: {
				password: passwordHash
			}
		})
	}
}

export const changeUserPassword = new ChangeUserPassword()
