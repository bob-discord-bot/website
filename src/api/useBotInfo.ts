import { FetchError, getAPI } from '@/api/shared'
import { useEffect, useState } from 'preact/hooks'

type BotInfo = {
	guilds: number
	questions: number
	responses: number
	version: string
}

const useBotInfo = () => {
	const [botInfo, setBotInfo] = useState<BotInfo | FetchError | undefined>(
		undefined
	)

	useEffect(() => {
		;(async () => {
			const resp = await fetch(getAPI('bot_info'))
			if (!resp.ok) {
				return setBotInfo({ error: true })
			}
			setBotInfo((await resp.json()) as BotInfo)
		})()
	}, [])

	return botInfo
}

export default useBotInfo
