import { Pet, User } from "@prisma/client"

export type EditUserProfileDTO = Pick<
  User,
  "name" | "password" | "phone" | "email"
>

export type UserSingUpDTO = Pick<User, "email" | "password" | "phone" | "name">

export type UserSingInDTO = Pick<User, "email" | "password">

export type CreatePetDTO = Pick<
  Pet,
  "name" | "age" | "color" | "weight" | "images"
>
