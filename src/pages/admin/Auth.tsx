import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'preact/hooks'
import { useNavigate } from 'react-router'

const Auth = () => {
	const navigate = useNavigate()

	useEffect(() => {
		fetch(`${API_DOMAIN}api/auth/start`, { method: 'POST' }).then((resp) => {
			console.log('auth start:', resp.ok)
		})
	}, [])

	const [failed, setFailed] = useState(false)

	useEffect(() => {
		if (failed) setTimeout(() => navigate('/', { replace: true }), 5000)
	}, [failed])

	if (failed)
		return (
			<div class="flex h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-transparent to-rose-800/40 p-4">
				<h1 class="text-5xl font-semibold">You do not speak our language.</h1>
			</div>
		)

	return (
		<div class="flex h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-transparent to-rose-800/40 p-4">
			<h1 class="text-5xl font-semibold">You're in a guarded area.</h1>
			<h2 class="text-2xl">Enter the magic words to proceed.</h2>
			<Formik
				initialValues={{
					key: '',
				}}
				onSubmit={async (values) => {
					const resp = await fetch(`${API_DOMAIN}api/auth/check`, {
						headers: {
							Authorization: values.key,
						},
					})
					if (resp.ok) {
						localStorage['DashToken'] = values.key
						navigate('..')
					} else {
						setFailed(true)
					}
				}}
			>
				<Form className="flex flex-col items-center gap-6">
					<Field
						name="key"
						type="text"
						class="rounded-full border border-rose-400 bg-rose-600/40 px-6 py-3"
					></Field>
					<button
						type="submit"
						class="rounded-lg border border-emerald-400 bg-gradient-to-br from-emerald-500 to-emerald-700 px-6 py-3 text-lg font-semibold shadow-lg shadow-emerald-600/40 transition-all duration-200 hover:scale-105 hover:shadow-emerald-500/40"
					>
						Enter the castle
					</button>
				</Form>
			</Formik>
		</div>
	)
}

export default Auth
