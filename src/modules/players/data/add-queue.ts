import axios from '../../axios'
import { QueueData } from '../types/queue'

export const revalidate = 0

export async function addPlaybackQueue(uri: string, deviceId: string): Promise<boolean> {
    await axios.post<QueueData>('/me/player/queue', undefined, {
        params: {
            device_id: deviceId,
            uri: uri,
        },
    })
    return true
}
