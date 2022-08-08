import useBotInfo from '@/api/useBotInfo'
import { Link, LinkProps } from 'react-router-dom'

const StyledLink = (props: LinkProps) => (
	<Link
		className="border-emerald-500 font-semibold text-emerald-200 transition-all duration-75 hover:border-b-4"
		{...props}
	/>
)

const Footer = () => {
	const botInfo = useBotInfo()
	return (
		<div class="container mx-auto grid gap-4 p-8 md:grid-cols-2 lg:grid-cols-3">
			<div>
				<h1 class="text-xl font-semibold">bob</h1>
				<p>Your conversation partner.</p>
			</div>
			<div class="flex flex-col items-start gap-2">
				<StyledLink to="/">Home</StyledLink>
				<StyledLink to="/terms">Terms of Service and Privacy Policy</StyledLink>
			</div>
			<div class="flex flex-col items-start gap-2">
				{botInfo ? (
					!('error' in botInfo) ? (
						<>
							<p>
								<span class="font-semibold">{botInfo.guilds}</span> servers
							</p>
							<p>
								<span class="font-semibold">{botInfo.questions}</span> prompts
							</p>
							<p>
								<span class="font-semibold">{botInfo.responses}</span> responses
							</p>
							<p>
								Version <span class="font-semibold">{botInfo.version}</span>
							</p>
						</>
					) : (
						<p>Failed to load stats.</p>
					)
				) : (
					<p>Loading stats...</p>
				)}
			</div>
		</div>
	)
}

export default Footer
