import { FetchError, getAPI, Question } from '@/api/shared'
import { useEffect, useState } from 'preact/hooks'

const useQuestions = (params: {
	search?: string
	responseSearch?: string
	start?: number
	count?: number
}) => {
	const [questions, setQuestions] = useState<
		Record<number, Question> | FetchError | undefined
	>(undefined)

	let api = getAPI('questions')

	const apiParams: Record<string, string> = {}
	if (params.search) apiParams.search = params.search
	if (params.responseSearch) apiParams.response_search = params.responseSearch
	if (params.start) apiParams.start = params.start.toString()
	if (params.count) apiParams.count = params.count.toString()

	if (Object.keys(apiParams).length)
		api += '?' + new URLSearchParams(apiParams).toString()

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
	}, [params.search, params.responseSearch, params.start, params.count])

	return questions
}

export default useQuestions
