import prisma from "lib/prisma"

class GetAllPets {
  async execute() {
    return await prisma.pet.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })
  }
}

export const getAllPets = new GetAllPets()
