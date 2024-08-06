import { playbackState } from './playback'
import { playbackQueue } from './queue'

export const revalidate = 0

export async function getPlayerData() {
    const [state, queue] = await Promise.all([playbackState(), playbackQueue()])

    if (!state) {
        return null
    }

    return {
        state,
        queue,
    }
}
