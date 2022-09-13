import prisma from "lib/prisma"
import { CreatePetDTO } from "@types"
import { createPetSchema } from "validations/schemas/pet-create-schema"
import { BadRequestException } from "next-api-decorators"
import { File } from "@types"

class CreatePet {
  async execute(body: CreatePetDTO, files: File[], userId: string) {
    body.images = files.map((image) => image.key)
    await createPetSchema.validate(body)

    try {
      await prisma.pet.create({
        data: {
          ...body,
          available: true,
          owner: {
            connect: {
              id: userId
            }
          }
        }
      })
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}

export const createPet = new CreatePet()
