import { User } from '@prisma/client'
import encryptPassword from '../encrypt-password'
import { expect, describe, it } from 'vitest'

describe('Encrypt Password', () => {
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

	it('should returns a emcrypted password', async () => {
		const passwordHash = await encryptPassword(user.password)
		expect(passwordHash).not.toBe(user.password)
	})
})
