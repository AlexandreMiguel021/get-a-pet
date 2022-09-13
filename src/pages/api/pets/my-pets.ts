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
import { getUserPets } from "usecases/pets/get-user-pets"

@JwtAuthGuard()
class MyPets {
  @Get()
  @HttpCode(200)
  @Catch(exceptionHandler)
  public async getMyPets(@Req() req: Req) {
    const pets = await getUserPets.execute(req.userId)

    return {
      pets
    }
  }
}

export default createHandler(MyPets)
