import useQuestions from '@/api/useQuestions'
import { useState } from 'preact/hooks'
import styles from '@/pages/admin/panel/styles.module.scss'
import { QuestionObject } from '@/pages/admin/panel/Questions'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid'

const pageSize = 250

const Responses = () => {
	const [search, setSearch] = useState<string | undefined>(undefined)
	const [page, setPage] = useState(0)
	const questions = useQuestions({
		responseSearch: search,
		start: page * pageSize,
		count: pageSize,
	})
	const [openQuestion, setOpenQuestion] = useState(-1)

	return (
		<div class="flex flex-col gap-6 p-12">
			<h1 class="text-4xl font-semibold">Responses</h1>
			<input
				type="text"
				placeholder={`Search for responses in ${
					questions
						? !('error' in questions) && Object.keys(questions).length
						: 0
				} questions...`}
				class={styles.input}
				value={search}
				onChange={(e) => setSearch(e.currentTarget.value || undefined)}
			/>
			{questions ? (
				!('error' in questions) ? (
					Object.keys(questions).map((index) => (
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
			<div class="flex items-center gap-4">
				<button
					class="rounded-full bg-slate-800 p-3 disabled:opacity-50"
					disabled={page == 0}
					onClick={() => setPage(page - 1)}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</button>
				<p>
					Page <span className="font-semibold">{page + 1}</span> (
					{questions && Object.keys(questions).length}/{pageSize} questions
					shown)
				</p>
				<button
					class="rounded-full bg-slate-800 p-3 disabled:opacity-50"
					disabled={questions && Object.keys(questions).length !== pageSize}
					onClick={() => setPage(page + 1)}
				>
					<ArrowRightIcon className="h-5 w-5" />
				</button>
			</div>
		</div>
	)
}

export default Responses
