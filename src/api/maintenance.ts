import { getAPI } from '@/api/shared'

export const stopBot = async () => {
	const resp = await fetch(getAPI('maintenance/stop'), {
		headers: {
			Authorization: localStorage['DashToken'],
		},
	})
	return resp.ok
}

export const updateBot = async () => {
	const resp = await fetch(getAPI('maintenance/update'), {
		headers: {
			Authorization: localStorage['DashToken'],
		},
	})
	return resp.ok
}
