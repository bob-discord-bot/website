import { Question } from '@/api/shared'
import useQuestions from '@/api/useQuestions'
import { useState } from 'preact/hooks'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import styles from '@/pages/admin/panel/styles.module.scss'

const QuestionObject = (props: {
	index: number
	question: Question
	open: boolean
	onClick: () => void
}) => (
	<div
		class={classNames('cursor-pointer rounded-xl border bg-slate-800', {
			'border-slate-600 px-6 py-2': !props.open,
			'border-rose-400 p-6 shadow-lg shadow-rose-600/40': props.open,
		})}
		onClick={props.onClick}
	>
		{props.question.text}
		{props.open && (
			<div>
				<p class="my-4 font-semibold">Responses:</p>
				<ul class="ml-6 list-disc">
					{props.question.responses.map((response) => (
						<li>
							{response.text}{' '}
							<span class="text-slate-400">({response.count})</span>
						</li>
					))}
				</ul>
				<Link className={styles.button} to={props.index.toString()}>
					Manage
				</Link>
			</div>
		)}
	</div>
)

const Questions = () => {
	const questions = useQuestions()
	const [openQuestion, setOpenQuestion] = useState(-1)

	return (
		<div class="flex flex-col gap-6 p-12">
			<h1 class="text-4xl font-semibold">Questions</h1>
			{questions ? (
				!('error' in questions) ? (
					questions.map((question, index) => (
						<QuestionObject
							index={index}
							question={question}
							open={openQuestion === index}
							key={question.message}
							onClick={() => setOpenQuestion(index)}
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

export default Questions
