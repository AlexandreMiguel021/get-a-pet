import {
  Body,
  Catch,
  createHandler,
  Get,
  HttpCode,
  Req
} from "next-api-decorators"

import exceptionHandler from "utils/exception-handler"
import JwtAuthGuard from "middlewares/with-protect"
import { getUserAdoptions } from "usecases/pets/get-user-adoptions"

@JwtAuthGuard()
class MyAdoptions {
  @Get()
  @HttpCode(200)
  @Catch(exceptionHandler)
  public async getMyAdoptions(@Req() req: Req) {
    const pets = await getUserAdoptions.execute(req.userId)

    return {
      pets
    }
  }
}

export default createHandler(MyAdoptions)
