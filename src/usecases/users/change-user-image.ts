import prisma from 'lib/prisma'

class ChangeUserImage {
	async execute(image: string, id: string) {
		await prisma.user.update({
			where: {
				id
			},
			data: {
				image
			}
		})
	}
}

export const changeUserImage = new ChangeUserImage()
