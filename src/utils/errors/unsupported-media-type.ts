import { HttpException } from "next-api-decorators"

export class UnsupportedMediaTypeException extends HttpException {
  public constructor(message = "Unsupported media type") {
    super(415, message)
    this.name = "UnsupportedMediaType"
  }
}
