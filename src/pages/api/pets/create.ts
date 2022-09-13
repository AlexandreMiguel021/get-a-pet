import {
  Body,
  Catch,
  createHandler,
  HttpCode,
  Post,
  Req,
  UseMiddleware
} from "next-api-decorators"
import type { CreatePetDTO } from "@types"
import exceptionHandler from "utils/exception-handler"
import JwtAuthGuard from "middlewares/with-protect"
import { createPet } from "usecases/pets/create-pet"
import { upload } from "utils/image-upload"

export const config = {
  api: {
    bodyParser: false
  }
}

@JwtAuthGuard()
// @UseMiddleware(upload.array("images"))
class CreatePet {
  @Post()
  @HttpCode(201)
  @Catch(exceptionHandler)
  public async createPet(@Body() body: CreatePetDTO, @Req() req: Req) {
    await createPet.execute(body, req.files!, req.userId)
    return "ok"
  }
}

export default createHandler(CreatePet)
