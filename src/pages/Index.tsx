import useBotInfo from '@/api/useBotInfo'
import Footer from '@/components/Footer'

const Index = () => {
	const botInfo = useBotInfo()
	return (
		<>
			<div class="flex h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-transparent to-rose-800/40 p-4">
				<h1 class="text-5xl font-semibold italic">bob</h1>
				<h2 class="text-2xl italic">Your conversation partner.</h2>
				<a
					href="https://discord.com/api/oauth2/authorize?client_id=788740885021065276&permissions=3072&scope=bot"
					class="rounded-lg border border-emerald-400 bg-gradient-to-br from-emerald-500 to-emerald-700 px-6 py-3 text-lg font-semibold shadow-lg shadow-emerald-600/40 transition-all duration-200 hover:scale-105 hover:shadow-emerald-500/40"
				>
					Add bob to your server
				</a>
				{botInfo && !('error' in botInfo) && (
					<div class="grid grid-cols-2 gap-4 text-center">
						<h3 class="rounded-lg border border-rose-400 bg-rose-500/20 p-4 text-xl">
							<span class="font-semibold">{botInfo.questions}</span> unique
							prompts
						</h3>
						<h3 class="rounded-lg border border-rose-400 bg-rose-500/20 p-4 text-xl">
							and <span class="font-semibold">{botInfo.responses}</span>{' '}
							responses
						</h3>
						<h3 class="col-span-2 rounded-lg border border-rose-400 bg-rose-500/20 p-4 text-xl">
							<span class="font-semibold">{botInfo.guilds}</span> servers
						</h3>
					</div>
				)}
			</div>
			<Footer />
		</>
	)
}

export default Index
