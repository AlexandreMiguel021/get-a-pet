import { Body, Catch, createHandler, HttpCode, Post } from "next-api-decorators"
import type { UserSingInDTO } from "@types"
import { signIn } from "usecases/users"
import exceptionHandler from "utils/exception-handler"

class SignInHandler {
  @Post()
  @HttpCode(200)
  @Catch(exceptionHandler)
  public async signInUser(@Body() body: UserSingInDTO) {
    const accessToken = await signIn.execute(body)

    return { accessToken }
  }
}

export default createHandler(SignInHandler)
