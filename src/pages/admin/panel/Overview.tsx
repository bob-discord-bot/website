import { stopBot, updateBot } from '@/api/maintenance'
import useBotInfo from '@/api/useBotInfo'
import styles from '@/pages/admin/panel/styles.module.scss'

const Overview = () => {
	const botInfo = useBotInfo()
	return (
		<div class="flex flex-col gap-6 p-12">
			<h1 class="text-4xl font-semibold">Overview</h1>
			{botInfo ? (
				!('error' in botInfo) ? (
					<div class="grid max-w-sm grid-cols-2 gap-4 rounded-lg bg-slate-800 p-4 text-center">
						<p>{botInfo.questions} questions</p>
						<p>{botInfo.responses} responses</p>
						<p>{botInfo.guilds} guilds</p>
						<p>v{botInfo.version}</p>
					</div>
				) : (
					<p>Failed to load stats.</p>
				)
			) : (
				<p>Loading stats...</p>
			)}
			<div class="flex justify-start gap-6">
				<button
					class={styles.button}
					onClick={() =>
						stopBot().then((ok) =>
							alert(
								ok ? 'Successfully stopped the bot.' : 'Failed to stop the bot.'
							)
						)
					}
				>
					Stop the bot
				</button>
				<button
					class={styles.button}
					onClick={() =>
						updateBot().then((ok) =>
							alert(
								ok
									? 'Successfully updated and stopped the bot.'
									: 'Failed to update and stop the bot.'
							)
						)
					}
				>
					Update and stop the bot
				</button>
			</div>
		</div>
	)
}

export default Overview
