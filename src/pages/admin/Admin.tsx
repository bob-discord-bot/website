import Auth from '@/pages/admin/Auth'
import Panel from '@/pages/admin/Panel'
import { useEffect } from 'preact/hooks'
import { Route, Routes, useNavigate } from 'react-router'

const Admin = () => {
	const navigate = useNavigate()

	useEffect(() => {
		if (!('DashToken' in localStorage)) {
			console.debug('No dashboard token, redirecting to auth.')
			navigate('auth', { replace: true })
		} else {
			// TODO: check if token is valid
		}
	}, [])

	return (
		<Routes>
			<Route path="auth" element={<Auth />} />
			<Route path="*" element={<Panel />} />
		</Routes>
	)
}

export default Admin
