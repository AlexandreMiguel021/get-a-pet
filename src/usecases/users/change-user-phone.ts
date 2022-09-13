import prisma from 'lib/prisma'

class ChangeUserPhone {
	async execute(phone: string, id: string) {
		await prisma.user.update({
			where: {
				id
			},
			data: {
				phone
			}
		})
	}
}

export const changeUserPhone = new ChangeUserPhone()
