import { verify } from "jsonwebtoken"
import { NextApiResponse } from "next"
import {
  BadRequestException,
  createMiddlewareDecorator,
  UnauthorizedException
} from "next-api-decorators"
import getToken from "utils/get-token"
import prisma from "lib/prisma"

const JwtAuthGuard = createMiddlewareDecorator(
  async (req: any, res: NextApiResponse, next: any) => {
    const { authorization: token } = req.headers
    const accessToken = getToken(token!)
    let accessTokenDecoded: any

    if (!accessToken) {
      throw new BadRequestException("Please log in to get access!")
    }

    verify(accessToken, process.env.JWT_SECRET!, (err, decoded) => {
      if (err) {
        throw new UnauthorizedException()
      }

      accessTokenDecoded = decoded
      req.userId = accessTokenDecoded.id
    })

    const currentUser = await prisma.user.findUnique({
      where: {
        id: accessTokenDecoded.id
      }
    })

    if (!currentUser) {
      throw new UnauthorizedException()
    }

    next()
  }
)

export default JwtAuthGuard
