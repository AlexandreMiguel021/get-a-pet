import prisma from "lib/prisma"
import { BadRequestException } from "next-api-decorators"

class FindPetById {
  async execute(id: string) {
    try {
      return await prisma.pet.findUnique({
        where: {
          id
        }
      })
    } catch (error) {
      throw new BadRequestException("Invalid ID, check and try again.")
    }
  }
}

export const findPetById = new FindPetById()
