import multer from "multer"
import multerS3 from "multer-s3"
import { S3Client } from "@aws-sdk/client-s3"
import process from "process"
import { UnsupportedMediaTypeException } from "./errors/unsupported-media-type"

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!
  },
  region: process.env.AWS_REGION!
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET!,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key(req, file, cb) {
      cb(null, Date.now().toString())
    }
  }),
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(
        new UnsupportedMediaTypeException("only png and jpg files is accept")
      )
    }

    cb(null, true)
  },
  limits: {
    fieldNameSize: 50, // 50 caracters
    fileSize: 5000000 // 5mb
  }
})

export { upload }
