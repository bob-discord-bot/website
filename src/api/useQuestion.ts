import { FetchError, getAPI, Question } from '@/api/shared'
import { useEffect, useState } from 'preact/hooks'

const useQuestion = (index: number) => {
	const [question, setQuestion] = useState<Question | FetchError | undefined>(
		undefined
	)

	useEffect(() => {
		;(async () => {
			const resp = await fetch(getAPI(`questions/${index}`), {
				headers: {
					Authorization: localStorage['DashToken'],
				},
			})
			if (!resp.ok) {
				return setQuestion({ error: true })
			}
			setQuestion((await resp.json()) as Question)
		})()
	}, [])

	return question
}

export default useQuestion
