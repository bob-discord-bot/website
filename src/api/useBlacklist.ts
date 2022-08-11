import { FetchError, getAPI } from '@/api/shared'
import { useEffect, useState } from 'preact/hooks'

const useBlacklist = () => {
	const [blacklist, setBlacklist] = useState<string[] | FetchError | undefined>(
		undefined
	)

	useEffect(() => {
		;(async () => {
			const resp = await fetch(getAPI('blacklist'), {
				headers: {
					Authorization: localStorage['DashToken'],
				},
			})
			if (!resp.ok) {
				return setBlacklist({ error: true })
			}
			setBlacklist((await resp.json()) as string[])
		})()
	}, [])

	return blacklist
}

export default useBlacklist
