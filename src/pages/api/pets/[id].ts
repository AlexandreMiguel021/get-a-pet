import {
  Catch,
  createHandler,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Query,
  Req
} from "next-api-decorators"
import exceptionHandler from "utils/exception-handler"
import { findPetById } from "usecases/pets/find-pet-by-id"
import { deletePet } from "usecases/pets/delete-pet"
import { ownThisPet } from "usecases/pets/own-this-pet"
import JwtAuthGuard from "middlewares/with-protect"

class GetPetById {
  @Get()
  @HttpCode(200)
  @Catch(exceptionHandler)
  public async findPet(@Query("id") id: string) {
    const pet = await findPetById.execute(id)

    if (!pet) {
      throw new NotFoundException("Pet not found, check and try again.")
    }

    return {
      pet
    }
  }

  @Delete()
  @HttpCode(200)
  @JwtAuthGuard()
  @Catch(exceptionHandler)
  public async delete(@Query("id") id: string, @Req() req: Req) {
    if (!(await ownThisPet.execute(id, req.userId))) {
      throw new ForbiddenException("You are not allowed to delete the pet.")
    }

    await deletePet.execute(id)

    return {
      message: "pet successfully delete"
    }
  }
}

export default createHandler(GetPetById)
