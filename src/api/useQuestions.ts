import { FetchError, getAPI, Question } from '@/api/shared'
import { useEffect, useState } from 'preact/hooks'

const useQuestions = (search?: string) => {
	const [questions, setQuestions] = useState<
		Question[] | FetchError | undefined
	>(undefined)

	let api = getAPI('questions')

	if (search) {
		api += '?' + new URLSearchParams({ search }).toString()
	}

	useEffect(() => {
		;(async () => {
			const resp = await fetch(api, {
				headers: {
					Authorization: localStorage['DashToken'],
				},
			})
			if (!resp.ok) {
				return setQuestions({ error: true })
			}
			setQuestions((await resp.json()) as Question[])
		})()
	}, [])

	return questions
}

export default useQuestions
