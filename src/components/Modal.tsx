import { XMarkIcon } from '@heroicons/react/24/solid'
import { ComponentChildren } from 'preact'

const Modal = (props: {
	title: string
	open: boolean
	onClose: () => void
	children?: ComponentChildren
}) =>
	props.open ? (
		<div
			class="absolute top-0 left-0 flex min-h-screen min-w-full cursor-auto items-center justify-center bg-slate-800/40 backdrop-blur-xl"
			onClick={(event) =>
				event.target === event.currentTarget && props.onClose()
			}
		>
			<div class="flex min-w-[20rem] flex-col gap-6 rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
				<div class="flex flex-1 justify-between">
					<h2 class="text-xl font-semibold">{props.title}</h2>
					<button class="h-6 w-6" onClick={props.onClose}>
						<XMarkIcon className="h-6 w-6" />
					</button>
				</div>
				{props.children}
			</div>
		</div>
	) : null

export default Modal
