import prisma from "lib/prisma"

class GetUserPets {
  async execute(userId: string) {
    const pets = await prisma.pet.findMany({
      where: {
        userId
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return pets
  }
}

export const getUserPets = new GetUserPets()
