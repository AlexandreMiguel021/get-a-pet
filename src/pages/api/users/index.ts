import { Body, Catch, createHandler, Get, HttpCode } from "next-api-decorators"
import type { UserSingInDTO } from "@types"
import { signIn } from "usecases/users"
import exceptionHandler from "utils/exception-handler"
import prisma from "lib/prisma"

class GetAllUsers {
  @Get()
  @HttpCode(200)
  @Catch(exceptionHandler)
  public async signInUser() {
    const users = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        image: true,
        phone: true,
        password: false,
        pets: true
      }
    })

    return Array.from(users)
  }
}

export default createHandler(GetAllUsers)
