import useQuestions from '@/api/useQuestions'
import { useEffect, useState } from 'preact/hooks'
import styles from '@/pages/admin/panel/styles.module.scss'
import { QuestionObject } from '@/pages/admin/panel/Questions'
import { Question } from '@/api/shared'

const Responses = () => {
	const [search, setSearch] = useState<string | undefined>(undefined)
	const questions = useQuestions()
	const [openQuestion, setOpenQuestion] = useState(-1)

	const [filteredQuestions, setFilteredQuestions] = useState<
		Record<number, Question> | undefined
	>(undefined)

	useEffect(() => {
		if (!questions || 'error' in questions) return

		if (!search) setFilteredQuestions(questions)
		else {
			const filteredKeys = Object.keys(questions).filter(
				(key) =>
					questions[Number.parseInt(key)].responses.filter((resp) =>
						resp.text.includes(search)
					).length
			)
			const newQuestions: Record<number, Question> = {}
			filteredKeys.forEach(
				(key) =>
					(newQuestions[Number.parseInt(key)] = questions[Number.parseInt(key)])
			)
			setFilteredQuestions(newQuestions)
		}
	}, [questions, search])

	return (
		<div class="flex flex-col gap-6 p-12">
			<h1 class="text-4xl font-semibold">Responses</h1>
			<input
				type="text"
				placeholder={`Search in ${
					questions
						? !('error' in questions) && Object.keys(questions).length
						: 0
				} questions...`}
				class={styles.input}
				value={search}
				onChange={(e) => setSearch(e.currentTarget.value || undefined)}
			/>
			{questions && filteredQuestions ? (
				!('error' in questions) ? (
					Object.keys(filteredQuestions).map((index) => (
						<QuestionObject
							index={Number.parseInt(index)}
							question={questions[Number.parseInt(index)]}
							open={openQuestion === Number.parseInt(index)}
							key={index}
							onClick={() => setOpenQuestion(Number.parseInt(index))}
						/>
					))
				) : (
					<p>Failed to load questions.</p>
				)
			) : (
				<p>Loading...</p>
			)}
		</div>
	)
}

export default Responses
