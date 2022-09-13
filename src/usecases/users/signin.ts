import { UserSingInDTO } from "@types"
import { compare } from "bcrypt"
import { UnauthorizedException } from "next-api-decorators"
import { NotAcceptableException } from "utils/errors/not-acceptable"
import tokenGenerator from "utils/token-generator"
import { userSigninSchema } from "validations/schemas"
import { findUser } from "./find-user-by-unique-paramater"

class SignIn {
  async execute(data: UserSingInDTO) {
    const { email, password } = data
    await userSigninSchema.validate(data)

    const findedUser = await findUser.execute("email", email)

    if (!findedUser) {
      throw new NotAcceptableException()
    }

    const matchesWithDbPassword = await compare(password, findedUser.password)

    if (!matchesWithDbPassword) {
      throw new UnauthorizedException()
    }

    const accessToken = tokenGenerator(findedUser)

    return accessToken
  }
}

export const signIn = new SignIn()
