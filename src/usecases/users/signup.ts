import { UserSingUpDTO } from "@types"
import { ConflictException } from "next-api-decorators"
import encryptPassword from "utils/encrypt-password"
import tokenGenerator from "utils/token-generator"
import { findUser } from "./find-user-by-unique-paramater"

class SignUp {
  async execute(data: UserSingUpDTO) {
    const { email, password } = data

    const userExists = await findUser.execute("email", email)

    if (userExists) {
      throw new ConflictException("Already user exists")
    }

    const passwordHash = await encryptPassword(password)

    const createdUser = await prisma.user.create({
      data: { ...data, password: passwordHash }
    })

    const accessToken = await tokenGenerator(createdUser)

    return accessToken
  }
}

export const signUp = new SignUp()
