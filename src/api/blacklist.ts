import { getAPI } from '@/api/shared'

const blacklist = async (id: string) => {
	const resp = await fetch(getAPI('blacklist'), {
		method: 'POST',
		headers: {
			Authorization: localStorage['DashToken'],
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ id }),
	})

	return resp.ok
}

export const deleteFromBlacklist = async (id: string) => {
	const resp = await fetch(getAPI(`blacklist/${id}`), {
		method: 'DELETE',
		headers: {
			Authorization: localStorage['DashToken'],
		},
	})

	return resp.ok
}

export default blacklist
