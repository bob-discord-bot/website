import Fallback from '@/components/Fallback'
import { lazy, Suspense } from 'react'
import '@fontsource/inter'
import '@/index.scss'

const Index = lazy(() => import('@/pages/Index'))

const App = () => (
	<>
		<Suspense fallback={<Fallback />}>
			<Index />
		</Suspense>
	</>
)

export default App
