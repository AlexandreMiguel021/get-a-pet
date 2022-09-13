import {
  Catch,
  createHandler,
  HttpCode,
  Put,
  Req,
  UseMiddleware
} from "next-api-decorators"

import JwtAuthGuard from "middlewares/with-protect"
import exceptionHandler from "utils/exception-handler"
import { upload } from "utils/image-upload"
import { userEditSchema } from "validations/schemas/user-edit-schema"
import { changeUserEmail } from "usecases/users"
import { changeUserPhone } from "usecases/users"
import { changeUserPassword } from "usecases/users"
import { changeUserImage } from "usecases/users"

export const config = {
  api: {
    bodyParser: false
  }
}

@JwtAuthGuard()
@UseMiddleware(upload.single("image"))
class EditUserProfileHandler {
  @Put()
  @HttpCode(200)
  @Catch(exceptionHandler)
  public async edit(@Req() req: Req) {
    const { email, password, phone } = req.body
    const userId = req.userId
    const image = req.file?.key

    await userEditSchema.validate(req.body)
    console.log(req.file)
    if (email) await changeUserEmail.execute(email, userId)

    if (phone) await changeUserPhone.execute(phone, userId)

    if (password) await changeUserPassword.execute(password, userId)

    if (image) await changeUserImage.execute(image, userId)

    return "ok"
  }
}

export default createHandler(EditUserProfileHandler)
