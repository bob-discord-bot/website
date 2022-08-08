import '@fontsource/inter/variable.css'
import '@/index.scss'
import Index from '@/pages/Index'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Terms from '@/pages/Terms'
import Footer from '@/components/Footer'

const App = () => (
	<BrowserRouter>
		<Routes>
			<Route index element={<Index />} />
			<Route path="terms" element={<Terms />} />
			<Route path="*" element={<p>not found</p>} />
		</Routes>
		<Footer />
	</BrowserRouter>
)

export default App
