import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'

const tokenGenerator = async (user: User) => {
	const { id } = user

	const token = jwt.sign(
		{
			id: id
		},
		process.env.JWT_SECRET
	)

	return token
}

export default tokenGenerator
