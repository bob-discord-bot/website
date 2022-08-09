import { Route, Routes } from 'react-router'
import { NavLink } from 'react-router-dom'
import styles from '@/pages/admin/styles.module.scss'
import Overview from '@/pages/admin/panel/Overview'
import {
	ChatIcon,
	HomeIcon,
	MinusCircleIcon,
	QuestionMarkCircleIcon,
} from '@heroicons/react/outline'
import Questions from '@/pages/admin/panel/Questions'
import QuestionManage from '@/pages/admin/panel/QuestionManage'
import Responses from '@/pages/admin/panel/Responses'

const Panel = () => (
	<div class="min-w-screen flex h-screen">
		{/* Sidebar */}
		<div class="flex w-72 flex-none flex-col gap-6 bg-slate-800 p-6">
			<h1 class="text-4xl font-semibold">bob</h1>
			<NavLink end to="." className={styles.link}>
				<HomeIcon />
				Overview
			</NavLink>
			<NavLink to="questions" className={styles.link}>
				<QuestionMarkCircleIcon />
				Questions
			</NavLink>
			<NavLink to="responses" className={styles.link}>
				<ChatIcon />
				Responses
			</NavLink>
			<NavLink to="blacklist" className={styles.link}>
				<MinusCircleIcon />
				Blacklist
			</NavLink>
		</div>
		<div class="flex-1 overflow-auto">
			<Routes>
				<Route index element={<Overview />} />
				<Route path="questions" element={<Questions />} />
				<Route path="questions/:question" element={<QuestionManage />} />
				<Route path="responses" element={<Responses />} />
			</Routes>
		</div>
	</div>
)

export default Panel
