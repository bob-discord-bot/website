const Privacy: Record<string, string[]> = {
	'Message collection and usage': [
		'If opted-in, Bob will use your messages, including attachments, to learn and expand its database.',
		'The bot will additionally log server, channel, message and author IDs.',
		'Bob will use the messages in its database to respond to messages from other users.',
	],
	'Data protection': [
		'Bob will keep sensitive data (such as server, channel, message and author IDs) private, and will be visible only to the bot owner.',
		'Bob will never send sensitive data listed above in a reply to users.',
	],
	'Data removal': [
		"If you wish to delete your message or messages from Bob's reply database for whatever reason, please contact the bot owner.",
	],
}

const TermsOfService: Record<string, string[]> = {
	Blacklisting: [
		'If the bot owner sees Bob learn messages deemed inappropriate from your replies, the bot owner reserves any right to delete the replies as well as blacklist you.',
		'The blacklist stops Bob from learning from your replies, but it does not block you from using the bot to chat.',
	],
}

const Terms = () => (
	<div class="bg-gradient-to-b from-transparent to-rose-800/40">
		<div class="container mx-auto px-8 py-32">
			<h1 class="mb-4 text-5xl font-semibold">Terms of Service</h1>
			{Object.keys(TermsOfService).map((title) => (
				<>
					<h2 class="my-4 text-2xl font-semibold">{title}</h2>
					{TermsOfService[title].map((text) => (
						<p class="mb-2">{text}</p>
					))}
				</>
			))}
			<h1 class="mt-16 mb-4 text-5xl font-semibold">Privacy Policy</h1>
			{Object.keys(Privacy).map((title) => (
				<>
					<h2 class="my-4 text-2xl font-semibold">{title}</h2>
					{Privacy[title].map((text) => (
						<p class="mb-2">{text}</p>
					))}
				</>
			))}
		</div>
	</div>
)

export default Terms
