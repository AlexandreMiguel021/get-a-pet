import prisma from "lib/prisma"
import { BadRequestException, NotFoundException } from "next-api-decorators"

/**
 * Own this pet
 * @description validates if the user making the request owns the pet
 * @returns false or true
 */
class OwnThisPet {
  async execute(petId: string, userId: string) {
    const ownThisPet = await prisma.pet.findUnique({
      where: {
        id: petId
      }
    })

    if (!ownThisPet) {
      throw new NotFoundException("Pet not found, check and try again.")
    }

    return ownThisPet?.userId === userId
  }
}

export const ownThisPet = new OwnThisPet()
