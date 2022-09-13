import prisma from "lib/prisma"
import { BadRequestException } from "next-api-decorators"
import { isAdopter } from "usecases/adopter/is-adopter"

class GetUserAdoptions {
  async execute(userId: string) {
    const adopter = await isAdopter.execute(userId)

    try {
      if (adopter) {
        return await prisma.pet.findMany({
          where: {
            adopterId: adopter.id
          },
          orderBy: {
            createdAt: "desc"
          }
        })
      }
    } catch (error) {
      return new BadRequestException(error)
    }
  }
}

export const getUserAdoptions = new GetUserAdoptions()
