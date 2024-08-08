import axios from '../../axios'
import { QueueData } from '../types/queue'

export const revalidate = 0

export async function nextQueue(deviceId: string): Promise<boolean> {
    await axios.post<QueueData>('/me/player/next', undefined, {
        params: {
            device_id: deviceId,
        },
    })
    return true
}
