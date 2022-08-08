export const getAPI = (endpoint: string) => `${API_DOMAIN}api/${endpoint}`

export type FetchError = {
	error: boolean
}

export type Response = {
	author: number
	channel: number
	guild: number
	message: number
	count: number
	text: string
}

export type Question = {
	author: number
	channel: number
	guild: number
	message: number
	text: string
	responses: Response[]
}
