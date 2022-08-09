import useQuestion from '@/api/useQuestion'
import { Response } from '@/api/shared'
import { useNavigate, useParams } from 'react-router'
import styles from '@/pages/admin/panel/styles.module.scss'
import { useState } from 'preact/hooks'
import classNames from 'classnames'
import blacklist from '@/api/blacklist'
import Modal from '@/components/Modal'

const ResponseObject = (props: {
	response: Response
	index: number
	open: boolean
	onClick: () => void
}) => {
	const [confirm, setConfirm] = useState(false)
	return (
		<div
			class={classNames('cursor-pointer rounded-xl border bg-slate-800', {
				'border-slate-600 px-6 py-2': !props.open,
				'border-rose-400 p-6 shadow-lg shadow-rose-600/40': props.open,
			})}
			onClick={props.onClick}
		>
			{props.response.text}
			{props.open && (
				<div class="mt-6 flex flex-col items-start gap-6">
					<div class="grid grid-cols-2 items-center gap-4 rounded-lg bg-slate-700 p-4 text-center lg:grid-cols-4">
						<p>Author: {props.response.author}</p>
						<p>Guild: {props.response.guild}</p>
						<p>Channel: {props.response.channel}</p>
						<p>Message: {props.response.message}</p>
					</div>
					<button class={styles.button} onClick={() => setConfirm(true)}>
						Delete response
					</button>
				</div>
			)}
			<Modal
				title="Delete response?"
				open={confirm}
				onClose={() => setConfirm(false)}
			>
				<p>
					Are you sure you want to delete response #{props.index}?{' '}
					<span class="font-bold text-red-400">
						This action is irreversible.
					</span>
				</p>
				<p class="whitespace-pre-wrap break-all">
					Response content: {props.response.text}
				</p>
				<button class={styles.button}>Delete response</button>
			</Modal>
		</div>
	)
}

const QuestionManage = () => {
	const params = useParams<{ question: string }>()
	const question = useQuestion(Number.parseInt(params.question || '-1'))
	const [confirm, setConfirm] = useState(false)
	const [openResponse, setOpenResponse] = useState(-1)
	const navigate = useNavigate()

	const blacklistAuthor = () => {
		if (!question || 'error' in question) return
		blacklist(question.author).then((ok) => {
			if (ok) navigate('..')
		})
	}

	return (
		<div class="flex flex-col gap-6 p-12">
			<h1 class="text-4xl font-semibold">
				Managing question {params.question}
			</h1>
			{question ? (
				!('error' in question) ? (
					<>
						<p>{question.text}</p>
						<div class="grid grid-cols-2 items-center gap-4 rounded-lg bg-slate-800 p-4 text-center lg:grid-cols-4">
							<p>Author: {question.author}</p>
							<p>Guild: {question.guild}</p>
							<p>Channel: {question.channel}</p>
							<p>Message: {question.message}</p>
						</div>
						<div class="flex justify-start gap-6">
							<button class={styles.button} onClick={() => setConfirm(true)}>
								Delete question
							</button>
							<button class={styles.button} onClick={() => blacklistAuthor()}>
								Blacklist author
							</button>
						</div>
						<h2 class="text-2xl font-semibold">Responses</h2>
						{question.responses.map((response, index) => (
							<ResponseObject
								response={response}
								index={index}
								open={openResponse === index}
								onClick={() => setOpenResponse(index)}
							/>
						))}
					</>
				) : (
					<p>Failed to load question.</p>
				)
			) : (
				<p>Loading...</p>
			)}
		</div>
	)
}

export default QuestionManage
