import { Body, Catch, createHandler, Get, HttpCode } from "next-api-decorators"
import exceptionHandler from "utils/exception-handler"
import { getAllPets } from "usecases/pets/get-all-pets"

class GetAllPets {
  @Get()
  @HttpCode(200)
  @Catch(exceptionHandler)
  public async signInUser() {
    const pets = await getAllPets.execute()

    return {
      pets
    }
  }
}

export default createHandler(GetAllPets)
