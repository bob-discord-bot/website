import { getAPI } from '@/api/shared'

const blacklist = async (author: number) => {
	const resp = await fetch(getAPI('blacklist'), {
		method: 'POST',
		headers: {
			Authorization: localStorage['DashToken'],
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ id: author.toString() }),
	})

	return resp.ok
}

export default blacklist
