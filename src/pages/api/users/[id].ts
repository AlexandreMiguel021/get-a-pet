import { Catch, createHandler, Get, HttpCode, Query } from "next-api-decorators"
import exceptionHandler from "utils/exception-handler"
import { findUser } from "usecases/users"
import { NotAcceptableException } from "utils/errors/not-acceptable"

class FindByIdHandler {
  @Get()
  @HttpCode(200)
  @Catch(exceptionHandler)
  public async findUser(@Query("id") id: string) {
    const user = await findUser.execute("id", id)

    if (!user) {
      throw new NotAcceptableException("User not found, check and try again.")
    }

    return {
      ...user,
      password: undefined
    }
  }
}

export default createHandler(FindByIdHandler)
