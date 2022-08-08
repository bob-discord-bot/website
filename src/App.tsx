import '@fontsource/inter/variable.css'
import '@/index.scss'
import Index from '@/pages/Index'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Terms from '@/pages/Terms'
import { lazy, Suspense } from 'preact/compat'
import Fallback from '@/components/Fallback'

const Admin = lazy(() => import('@/pages/admin/Admin'))

const App = () => (
	<BrowserRouter>
		<Suspense fallback={<Fallback />}>
			<Routes>
				<Route index element={<Index />} />
				<Route path="terms" element={<Terms />} />
				<Route path="*" element={<p>not found</p>} />
				<Route path="admin/*" element={<Admin />} />
			</Routes>
		</Suspense>
	</BrowserRouter>
)

export default App
