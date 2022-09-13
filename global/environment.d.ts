import { File } from '@types'

export {}

declare global {
	interface NextApiResponse {
		file: File
	}

	namespace NodeJS {
		interface ProcessEnv {
			MONGODB_URI: string
			MONGODB_DB: string
			NEXT_PUBLIC_API: string
			JWT_SECRET: string
			ENV: 'devlopment' | 'production'
		}
	}
}
