import { Question } from '@/api/shared'
import useQuestions from '@/api/useQuestions'
import { useState } from 'preact/hooks'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import styles from '@/pages/admin/panel/styles.module.scss'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid'

export const QuestionObject = (props: {
	index: number
	question: Question
	open: boolean
	onClick: () => void
}) => (
	<div
		class={classNames(
			'cursor-pointer whitespace-pre-wrap break-all rounded-xl border bg-slate-800',
			{
				'border-slate-600 px-6 py-2': !props.open,
				'border-rose-400 p-6 shadow-lg shadow-rose-600/40': props.open,
			}
		)}
		onClick={props.onClick}
	>
		{props.question.text}
		{props.open && (
			<div>
				<p class="my-4 font-semibold">Responses:</p>
				<ul class="ml-6 mb-4 list-disc">
					{props.question.responses.map((response) => (
						<li>
							{response.text}{' '}
							<span class="text-slate-400">({response.count})</span>
						</li>
					))}
				</ul>
				<Link className={styles.button} to={`/admin/questions/${props.index}`}>
					Manage
				</Link>
			</div>
		)}
	</div>
)

const pageSize = 250

const Questions = () => {
	const [search, setSearch] = useState<string | undefined>(undefined)
	const [page, setPage] = useState(0)
	const questions = useQuestions({
		search,
		start: page * pageSize,
		count: pageSize,
	})
	const [openQuestion, setOpenQuestion] = useState(-1)

	return (
		<div class="flex flex-col gap-6 p-12">
			<h1 class="text-4xl font-semibold">Questions</h1>
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

export default Questions
