import { NextApiRequest, NextApiResponse } from 'next'

type ErrorHandler = {
	name: string
	message: string
	statusCode: number
}

export default function exceptionHandler(
	error: ErrorHandler,
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.status(error.statusCode || 400).json({
		statusCode: error.statusCode,
		name: error.name,
		error: error.message
	})
}
