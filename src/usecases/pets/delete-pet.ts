import prisma from "lib/prisma"
import { BadRequestException } from "next-api-decorators"

class DeletePet {
  async execute(id: string) {
    try {
      await prisma.pet.delete({
        where: {
          id
        }
      })
    } catch (error) {
      throw new BadRequestException("Pet not found, check and try again.")
    }
  }
}

export const deletePet = new DeletePet()
