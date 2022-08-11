export const getAPI = (endpoint: string) => `${API_DOMAIN}api/${endpoint}`

export type FetchError = {
	error: boolean
}

export type Response = {
	author: string
	channel: string
	guild: string
	message: string
	count: number
	text: string
}

export type Question = {
	author: string
	channel: string
	guild: string
	message: string
	text: string
	responses: Response[]
}
