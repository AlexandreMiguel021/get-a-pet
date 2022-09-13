import { File } from "@types"
import { NextApiRequest } from "next"

export {}
declare global {
  interface Req extends NextApiRequest {
    files?: File[]
    file?: File
    userId: string
  }
}
