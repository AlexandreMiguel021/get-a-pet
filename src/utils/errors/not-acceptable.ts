import { HttpException } from "next-api-decorators"

export class NotAcceptableException extends HttpException {
  public constructor(message = "Not Acceptable") {
    super(406, message)
    this.name = "Not Acceptable"
  }
}
