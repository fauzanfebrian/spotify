import { accessToken } from '@/modules/axios'
import { playbackState } from './playback'
import { playbackQueue } from './queue'

export async function getPlayerData() {
    await accessToken()

    const [state, queue] = await Promise.all([playbackState(), playbackQueue()])

    return {
        state,
        queue,
    }
}
