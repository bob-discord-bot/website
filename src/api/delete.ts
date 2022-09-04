import { getAPI } from '@/api/shared'

export const deleteQuestion = async (index: number) => {
	const resp = await fetch(getAPI(`questions/${index}`), {
		method: 'DELETE',
		headers: {
			Authorization: localStorage['DashToken'],
		},
	})
	return resp.ok
}

export const deleteResponse = async (question: number, index: number) => {
	const resp = await fetch(getAPI(`questions/${question}/responses/${index}`), {
		method: 'DELETE',
		headers: {
			Authorization: localStorage['DashToken'],
		},
	})
	return resp.ok
}
