import prisma from "lib/prisma"

class IsAdopter {
  async execute(userId: string) {
    const adopter = await prisma.adopter.findUnique({
      where: {
        userId
      }
    })
    return adopter
  }
}

export const isAdopter = new IsAdopter()
