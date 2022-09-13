const getToken = (token: string) => {
	const accessToken = token?.split(' ')[1]
	return accessToken
}

export default getToken
