import blacklist, { deleteFromBlacklist } from '@/api/blacklist'
import useBlacklist from '@/api/useBlacklist'
import styles from '@/pages/admin/panel/styles.module.scss'
import { Field, Form, Formik } from 'formik'

const Blacklist = () => {
	const list = useBlacklist()

	return (
		<div class="flex flex-col gap-6 p-12">
			<h1 class="text-4xl font-semibold">Blacklist</h1>
			{list ? (
				!('error' in list) ? (
					<>
						{list.map((id) => (
							<div class="flex items-center justify-between rounded-lg bg-slate-800 px-6 py-4">
								<p>{id}</p>
								<button
									class={styles.button}
									onClick={() => {
										deleteFromBlacklist(id).then(
											(ok) => ok && location.reload()
										)
									}}
								>
									Delete
								</button>
							</div>
						))}
						{!list.length && <p>There's no one in the blacklist.</p>}
					</>
				) : (
					<p>Failed to load blacklist.</p>
				)
			) : (
				<p>Loading...</p>
			)}
			<Formik
				initialValues={{ id: '' }}
				onSubmit={async (values) => {
					const ok = await blacklist(values.id)
					ok && location.reload()
				}}
			>
				<Form className="flex gap-6">
					<Field
						className={styles.input}
						name="id"
						type="text"
						placeholder="Enter ID"
					/>
					<button class={styles.button} type="submit">
						Blacklist
					</button>
				</Form>
			</Formik>
		</div>
	)
}

export default Blacklist
