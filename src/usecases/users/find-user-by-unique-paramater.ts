type FindBy = "email" | "id"
import prisma from "lib/prisma"
import { BadRequestException } from "next-api-decorators"

/**
 * Find user by unique param
 *
 * @param by find by email or id
 * @param param pass the search parameter according to the "by" parameter
 *
 * @example ```
 *  await findUser.execute('email', 'fulano@email.com')
 * ```
 */
class FindUser {
  async execute(by: FindBy, param: string) {
    try {
      return await prisma.user.findUnique({
        where: {
          [by]: param
        }
      })
    } catch (error) {
      throw new BadRequestException("syntax error, check and try again.")
    }
  }
}

export const findUser = new FindUser()
