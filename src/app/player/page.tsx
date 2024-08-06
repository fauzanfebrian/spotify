import { getPlayerData } from '@/modules/players/data'
import PlayerPage from '@/modules/players/page'

export const revalidate = 0

export default async function Player() {
    const playback = await getPlayerData().catch(() => null)

    return (
        <>
            <PlayerPage data={playback} />
        </>
    )
}
