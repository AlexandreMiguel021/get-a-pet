import { genSalt, hash } from 'bcrypt'

export default async function encryptPassword(password: string) {
	const salt = await genSalt(12)
	const passwordHash = await hash(password, salt)

	return passwordHash
}
