import { useEffect, useState } from 'preact/hooks'

type BotInfo = {
	guilds: number
	questions: number
	responses: number
	version: string
}

type FetchError = {
	error: boolean
}

const API_ENDPOINT = 'http://localhost:8540/api/bot_info'

const useBotInfo = () => {
	const [botInfo, setBotInfo] = useState<BotInfo | FetchError | undefined>(
		undefined
	)

	useEffect(() => {
		;(async () => {
			const resp = await fetch(API_ENDPOINT)
			if (!resp.ok) {
				return setBotInfo({ error: true })
			}
			setBotInfo((await resp.json()) as BotInfo)
		})()
	}, [])

	return botInfo
}

export default useBotInfo
