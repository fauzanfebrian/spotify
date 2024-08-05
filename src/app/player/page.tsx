import { getPlayerData } from '@/modules/players/data'
import PlayerPage from '@/modules/players/page'

export const revalidate = 0

export default async function Player() {
    const playback = await getPlayerData().catch(() => null)

    if (!playback) {
        return (
            <main className="h-screen w-screen max-w-full bg-img flex justify-center items-center">
                <p className="text-green-600 font-gotham text-3xl">Pengguna sedang tidak mendengarkan musik</p>
            </main>
        )
    }

    return (
        <>
            <PlayerPage {...playback} />
        </>
    )
}
