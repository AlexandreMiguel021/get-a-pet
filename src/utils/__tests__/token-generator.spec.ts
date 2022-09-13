import { User } from '@prisma/client'
import { verify } from 'jsonwebtoken'
import tokenGenerator from '../token-generator'
import { expect, describe, it } from 'vitest'

describe('Token Generator', () => {
	const user: User = {
		id: 'das8312d',
		name: 'name_name',
		email: 'test@test.com',
		password: '12341234',
		phone: '41987366722',
		image: null,
		createdAt: null,
		updatedAt: null
	}

	it('should returns a token with user id', async () => {
		const accessToken = await tokenGenerator(user)
		const decoded: any = verify(accessToken, process.env.JWT_SECRET)
		expect(decoded.id).toBe(user.id)
	})
})
